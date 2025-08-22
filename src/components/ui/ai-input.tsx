"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Github, Linkedin, Send, Youtube } from "lucide-react"

import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

interface UseAutoResizeTextareaProps {
  minHeight: number
  maxHeight?: number
}

function useAutoResizeTextarea({
  minHeight,
  maxHeight,
}: UseAutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current
      if (!textarea) return

      if (reset) {
        textarea.style.height = `${minHeight}px`
        return
      }

      textarea.style.height = `${minHeight}px`
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
      )

      textarea.style.height = `${newHeight}px`
    },
    [minHeight, maxHeight]
  )

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = `${minHeight}px`
    }
  }, [minHeight])

  useEffect(() => {
    const handleResize = () => adjustHeight()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [adjustHeight])

  return { textareaRef, adjustHeight }
}

const MIN_HEIGHT = 48
const MAX_HEIGHT = 164

const AnimatedPlaceholder = ({ showSearch }: { showSearch: boolean }) => (
  <AnimatePresence mode="wait">
    <motion.p
      key={showSearch ? "search" : "ask"}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.1 }}
      className="pointer-events-none w-[180px] text-sm absolute text-white/70"
    >
      {"Ask Ai to generate images..."}
    </motion.p>
  </AnimatePresence>
)

// props
interface AiInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
  onSubmit?: (prompt: string) => void
}

export default function AiInput({ value, onChange, onSubmit }: AiInputProps) {
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: MIN_HEIGHT,
    maxHeight: MAX_HEIGHT,
  })
  const [showSearch, setShowSearch] = useState(true)

  const handleSubmit = () => {
    if (!value.trim()) return

    // 🔹 Call submit action from parent (e.g., send API request)
    if (onSubmit) {
      onSubmit(value)
    }

    // 🔹 Reset value after submit
    onChange({ target: { value: "" } } as React.ChangeEvent<HTMLTextAreaElement>)
    adjustHeight(true)
  }

  return (
    <div className="w-full max-w-4xl py-4 max-[767px]:fixed max-[767px]:bottom-0 max-[767px]:left-0 max-[767px]:right-0 max-[767px]:z-50">
      <div className="w-full relative border rounded-[22px] border-black/5 p-1">
        <div className="w-full relative rounded-2xl bg-neutral-800/80 flex flex-col overflow-hidden">
          <div
            className="overflow-y-auto"
            style={{ maxHeight: `${MAX_HEIGHT}px` }}
          >
            <div className="relative">
              <Textarea
                id="ai-input-04"
                value={value}
                className="w-full rounded-2xl rounded-b-none px-4 py-3 border-none resize-none focus-visible:ring-0 leading-[1.2]"
                ref={textareaRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault() // prevent Enter submit
                  }
                }}
                onChange={(e) => {
                  setShowSearch(!e.target.value)
                  onChange(e)   // ✅ only update parent state
                  adjustHeight()
                }}
              />
              {!value && (
                <div className="absolute left-4 top-3">
                  <AnimatedPlaceholder showSearch={showSearch} />
                </div>
              )}
            </div>
          </div>

          <div className="h-12 bg-white/5 rounded-b-xl">
            
            {/* LinkedIn Icon Link */}
            <div className="flex gap-3 absolute left-3 bottom-1.5">
              <Link href="https://www.linkedin.com/in/tariq-mehmood-3ab013254/" target="_blank" rel="noopener noreferrer" className="bg-blue-500 p-2 rounded-full hover:bg-blue-500/70 transition-all duration-200 ease-in-out">
                <Linkedin className="w-5 h-5" />
              </Link>

              <Link href="https://www.youtube.com/@SyntaxilitY/" target="_blank" rel="noopener noreferrer" className="bg-red-500 p-2 rounded-full hover:bg-red-600 transition-all duration-200 ease-in-out">
                <Youtube className="w-5 h-5" />
              </Link>


              <Link href="http://github.com/TariqMehmood1004/" target="_blank" rel="noopener noreferrer" className="bg-black p-2 rounded-full hover:bg-black/50 transition-all duration-200 ease-in-out">
                <Github className="w-5 h-5" />
              </Link>
            </div>


            <div className="absolute right-3 bottom-3">
              <button
                type="button"
                onClick={handleSubmit}
                className={cn(
                  "rounded-full p-2 transition-colors",
                  value
                    ? "bg-[#ff3f17]/15 text-[#ff3f17] hover:bg-[#ff3f17]/20"
                    : "bg-white/5 text-white/40 hover:text-white transition-all duration-200 ease-in-out"
                )}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

