import gsap from 'gsap'

export const scrollAnimation = (position, target, isMobile, onUpdate) => {
    const tl = gsap.timeline();

    tl.to(position, {
        x: isMobile ? -7.0 : -3.38,
        y: isMobile ? -12.2 : -10.74,
        z: isMobile ? -6.0 : -5.93,
        scrollTrigger: {
            trigger: '.sound-section',
            start: 'top bottom',
            end: 'top top',
            scrub: 2,
            immediateRender: false
        },
        onUpdate
    })
    .to(target, {
        x: isMobile ? 0.7 : 1.52,
        y: isMobile ? 1.9 : 0.77,
        z: isMobile ? 0.7 : -1.08,
        scrollTrigger: {
            trigger: '.sound-section',
            start: 'top bottom',
            end: 'top top',
            scrub: 2,
            immediateRender: false
        }
    })
    .to('.jumbotron-section', {
        opacity: 0,
        scrollTrigger: {
            trigger: '.sound-section',
            start: 'top bottom',
            end: 'top top',
            scrub: 2,
            immediateRender: false
        }
    })
    .to('.sound-section-content', {
        opacity: 1,
        scrollTrigger: {
            trigger: '.sound-section',
            start: 'top bottom',
            end: 'top top',
            scrub: 2,
            immediateRender: false
        }
    })
    .to(position, {
        x: isMobile ? 9.36 : 1.56,
        y: isMobile ? 10.95 : 5.0,
        z: isMobile ? 0.09 : 0.01,
        scrollTrigger: {
            trigger: '.display-section',
            start: 'top bottom',
            end: 'top top',
            scrub: 2,
            immediateRender: false
        },
        onUpdate
    })
    .to(target, {
        x: isMobile ? -1.62 : -0.55,
        y: isMobile ? 0.02 : 0.32,
        z: isMobile ? -0.06 : 0.0,
        scrollTrigger: {
            trigger: '.display-section',
            start: 'top bottom',
            end: 'top top',
            scrub: 2,
            immediateRender: false
        }
    })
    .to('.display-section', {
        opacity: 1,
        scrollTrigger: {
            trigger: '.display-section',
            start: 'top bottom',
            end: 'top top',
            scrub: 2,
            immediateRender: false
        }
    })   
}