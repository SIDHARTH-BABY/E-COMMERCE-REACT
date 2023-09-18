import { describe, expect, it } from "vitest";
import { Banner, prevSlide, nextSlide, goToSlide } from "./Banner";


describe("prev-sliding-carousal",()=>{
    let slides=10
    let currentIndex= 0
    it("give 4",()=>{
        expect(prevSlide(currentIndex,slides)).toBe(slides-1)
    })
})