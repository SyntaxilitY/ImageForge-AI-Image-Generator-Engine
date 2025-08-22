"use client";
import AiInput from "@/components/ui/ai-input";
import { CardCarousel, SkeletonCardCarousel } from "@/components/ui/card-carousel";
import { useState, useEffect } from "react";

interface ImageResult {
    origin: string;
}

interface GenerateImageResponse {
    final_result?: ImageResult[];
    error?: string;
}

export default function GenerateImage() {
    const [prompt, setPrompt] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!prompt.trim()) {
            setImages([]);
            return;
        }

        const timeout = setTimeout(async () => {
            setLoading(true);
            setImages([]);

            try {
                const res = await fetch("/api/generate-image", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt }),
                });

                const data: GenerateImageResponse = await res.json();
                console.log("API Response:", data);

                // no `any`
                const urls = Array.isArray(data?.final_result)
                    ? data.final_result.map((item: ImageResult) => item.origin)
                    : [];

                setImages(urls);
            } catch (err) {
                if (err instanceof Error) {
                    console.error("Error:", err.message);
                } else {
                    console.error("Unknown error:", err);
                }
            } finally {
                setLoading(false);
            }
        }, 800);

        return () => clearTimeout(timeout);
    }, [prompt]);


    return (
        <main className="w-full flex flex-col items-center justify-end max-[767px]:justify-center min-h-screen">

            <div className="main-content w-full flex flex-col items-center">
                <div className="w-full">
                    <div className="rounded overflow-hidden">
                        {loading ? (
                            // Skeleton Loader (shimmer effect)
                            <>
                                <SkeletonCardCarousel />
                            </>
                        ) : (
                            <CardCarousel
                                images={images.map((url, idx) => ({
                                    src: url,
                                    alt: `Generated ${idx}`,
                                }))}
                            />
                        )}
                    </div>
                </div>
            </div>


            <AiInput
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onSubmit={(prompt) => setPrompt(prompt)}
            />
        </main>
    );
}
