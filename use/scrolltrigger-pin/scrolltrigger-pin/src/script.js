gsap.from("#A .animate", {duration: 1, y: 20, opacity: 0, scrollTrigger: {
  trigger: "#A",
  start: "top top"
}});

var pinAmount = $("section.fancy .container").outerWidth() / 3;
var horizontal_scroll_tl = gsap.timeline({
  scrollTrigger: {
    trigger: "section.fancy",
    scrub: 0.5,
    pin: "#main_wrapper",
    start: "top top",
    end: () => `+=${pinAmount}`
  }})
horizontal_scroll_tl
  .to("section.fancy .container", {xPercent: -66.66667,ease: "none"})

gsap.utils.toArray("#B, #C").forEach(section => {
  gsap.from(section.querySelector(".animate"), {duration: 1, y: 20, opacity: 0, scrollTrigger: {
    trigger: section,
    start: `${pinAmount}px top`
  }});
});
