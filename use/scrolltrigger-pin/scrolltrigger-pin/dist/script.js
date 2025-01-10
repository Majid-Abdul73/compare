



gsap.from("#A .animate", {duration: 1, y: 20, opacity: 0, scrollTrigger: {
  trigger: "#A",
  start: "top top"
}});




var pinAmount = $("section.casesslide .container").outerWidth() / 3;
var horizontal_scroll_tl = gsap.timeline({
  scrollTrigger: {
    trigger: "section.casesslide",
    scrub: 0.5,
    pin: ".gridContainer",
    start: "top top",
    end: () => `+=${pinAmount}`
  }})
horizontal_scroll_tl
  .to("section.casesslide .container", {xPercent: -66.66667,ease: "none"})




gsap.utils.toArray("#B, #C").forEach(section => {
  gsap.from(section.querySelector(".animate"), {duration: 1, y: 20, opacity: 0, scrollTrigger: {
    trigger: section,
    start: `${pinAmount}px top`
  }});
});



