"use client"

import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { SparklesIcon } from "lucide-react"
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules"

import { Badge } from "@/components/ui/badge"

interface CarouselProps {
  images: { src: string; alt: string }[]
  autoplayDelay?: number
  showPagination?: boolean
  showNavigation?: boolean
}

export const CardCarousel: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 1500,
  showPagination = true,
  showNavigation = true,
}) => {
  const css = `
  .swiper {
    width: 100%;
    padding-bottom: 50px;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    /* height: 300px; */
    /* margin: 20px; */
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
  }
  
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  `
  return (
    <section className="w-ace-y-4">
      <style>{css}</style>
      <div className="mx-auto w-full max-w-4xl rounded-[24px] p-2">
        <div className="relative mx-auto flex w-full flex-col rounded-[24px] p-2 md:items-start gap-8">
          <Badge
            variant="outline"
            className="absolute left-4 top-6 rounded-full bg-neutral-800 border-none px-3 py-2 text-base md:left-6"
          >
            <SparklesIcon className="fill-[#EEBDE0] stroke-1 text-neutral-800" />{" "}
            Developer: Tariq Mehmood
          </Badge>

          <div className="flex flex-col justify-center pb-2 pl-4 pt-14 md:items-center">
            <div className="flex gap-5">
              <div className="flex flex-col gap-5">
                <h3 className="text-4xl max-[767px]:text-2xl mt-3 opacity-85 font-bold tracking-tight">
                  AI Generated Images
                </h3>
                <p>
                  AI generated images based on your prompt. (Updates in
                  realtime as you type)
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-center gap-4">
            <div className="w-full">
              <Swiper
                spaceBetween={50}
                autoplay={{
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                }}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                className="swiper-3d swiper-container"
                loop={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                }}
                pagination={showPagination}
                navigation={
                  showNavigation
                    ? {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }
                    : undefined
                }
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="size-full rounded-3xl">
                      <Image
                        src={image.src}
                        width={900}
                        height={900}
                        className="size-full rounded-xl"
                        alt={image.alt}
                      />
                    </div>
                  </SwiperSlide>
                ))}
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="size-full rounded-3xl">
                      <Image
                        src={image.src}
                        width={500}
                        height={500}
                        className="size-full rounded-xl"
                        alt={image.alt}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const SkeletonCardCarousel: React.FC = () => {
  const css = `
  .swiper {
    width: 100%;
    padding-bottom: 50px;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
  }

  /* Shimmer Effect */
  .skeleton {
    position: relative;
    overflow: hidden;
    background-color: #1f1f1f; /* dark neutral */
  }

  .skeleton::after {
    content: "";
    position: absolute;
    top: 0;
    left: -150px;
    height: 100%;
    width: 150px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.08) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    100% {
      transform: translateX(300%);
    }
  }
  `

  return (
    <section className="w-ace-y-4 animate-pulse">
      <style>{css}</style>
      <div className="mx-auto w-full max-w-4xl rounded-[24px] p-2">
        <div className="relative mx-auto flex w-full flex-col rounded-[24px] p-2 md:items-start gap-8">
          
          <Badge
            variant="outline"
            className="absolute left-4 top-6 rounded-full bg-neutral-800 border-none px-3 py-2 text-base md:left-6"
          >
            <SparklesIcon className="fill-[#EEBDE0] stroke-1 text-neutral-800" />{" "}
            Developer: Tariq Mehmood
          </Badge>

          <div className="flex flex-col justify-center pb-2 pl-4 pt-14 md:items-center">
            <div className="flex gap-5">
              <div className="flex flex-col gap-5">
                <h3 className="text-4xl opacity-85 font-bold tracking-tight">
                  AI Generated Images
                </h3>
                <p>
                  AI generated images based on your prompt. (Updates in
                  realtime as you type)
                </p>
              </div>
            </div>
          </div>

          {/* Carousel Skeleton */}
          <div className="flex w-full items-center justify-center gap-4">
            <div className="w-full">
              <div className="flex max-[767px]:flex-col items-center justify-center gap-6">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="skeleton h-[250px] w-[300px] rounded-2xl"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

