// src/animations/animateChars.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);


type AnimateCharsConfig = {
    duration?: number;
    staggerAmount?: number;
    staggerFrom?: "random" | "start" | "center" | "end" | "edges" | number | [number, number] | undefined;
    ease?: string;
    x?: string | number;
    opacity? : number;
};

const createScrollTrigger = (triggerElement: Element, timeline: GSAPTimeline) => {
    ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 80%",
        onEnter: () => timeline.play(),
        onLeaveBack: () => timeline.progress(0).pause(), // reset on scroll back
    });
};

export const registerAnimateCharsEffect = () => {
    if (gsap.effects.animateChars) return; // prevent duplicate registration

    gsap.registerEffect({
        name: "animateChars",
        effect: (targets: gsap.TweenTarget, config: AnimateCharsConfig): GSAPTimeline => {
            const timeline = gsap.timeline({ paused: true });

            const elements =
                typeof targets === "string" ? targets : (targets as Element);;

            const splitText = SplitText.create(elements, { type: "words, chars" });

            timeline.set(splitText.chars, { opacity: 0 });

            timeline.from(splitText.chars, {
                opacity: config.opacity || 0,
                duration: config.duration || 0,
                stagger: {
                    amount: config.staggerAmount || 0,
                    from: config.staggerFrom || undefined,
                },
                ease: config.ease,
                x : config.x || 0,
            });

            if (elements instanceof NodeList) {
                elements.forEach((el) => createScrollTrigger(el as HTMLElement, timeline));
            } else {
                createScrollTrigger(elements as Element, timeline);
            }

            return timeline;
        },
        extendTimeline: true,
    });
};