//  Intro Section
const html = document.documentElement;
const canvas = document.querySelector('#hero-lightpass');
const context = canvas.getContext('2d');


const intro = document.querySelector(".intro");
const airPods = intro.querySelector("#hero-lightpass");
const text1 = intro.querySelector("#title");
const text2 = intro.querySelector("#text2");

// Scroll Magic
const controller = new ScrollMagic.Controller();
// Scenes
// Airpods Animation
let airPodsSectionAnimation = new ScrollMagic.Scene({
	duration: 9000,
	triggerElement: intro,
	triggerHook: 0,
})
	.setPin(intro)
	.addTo(controller);
// Text Animation

const titleAnimation = new TweenMax.fromTo(
	text1,
	3,
	{ opacity: 1 },
	{ opacity: 0 }
);
let titleScene = new ScrollMagic.Scene({
	duration: 3000,
	triggerElement: intro,
	triggerHook: 0,
})
	.setTween(titleAnimation)
	.addTo(controller);

const text2Animation = new TweenMax.fromTo(
	text2,
	3,
	{ opacity: 0 },
	{ opacity: 1, delay: 10 }
);
let text2Scene = new ScrollMagic.Scene({
	duration: 7000,
	triggerElement: intro,
	triggerHook: 0,
})
	.setTween(text2Animation)
	.addTo(controller);
// const textAnim3 = TweenMax.fromTo(end, 100, {color: 'black'}, {color: 'blue'})
// let scene3 = new ScrollMagic.Scene({
// 	duration: 3000,
// 	triggerElement: section,
// 	triggerHook: 0.5
// })
// //.addIndicators()
// .setTween(textAnim3)
// // .setPin(section)
// .addTo(controller);

// const textAnim4 = TweenMax.fromTo(end, 100, {opacity: '0'}, {opacity: '1'})
// let scene4 = new ScrollMagic.Scene({
// 	duration: 3000,
// 	triggerElement: section,
// 	triggerHook: 0
// })
// //.addIndicators()
// .setTween(textAnim4)
// .setPin(section)
// .addTo(controller);
// airPods Animation
let accelerationRate = 0.1;
let scrollPosition = 0;
let delay = 0;
// Getting the scroll position from the event and convert it into seconds
airPodsSectionAnimation.on("update", (e) => {
	scrollPosition = e.scrollPos / 1000;
});
// Delay catches upto the scrollPosition at accelerationRate
setInterval(() => {
	delay += (scrollPosition - delay) * accelerationRate;
	airPods.currentTime = delay;
}, 33.3);
// 33.3 will be the interval of each frame
// AIrpods is in 30fps, so 1 sec = 30 frames => 1000 milliseconds = 30 frames
// That implies 33.3 milliseconds would be great for each frame
// swiper lsider
var swiper = new Swiper(".mySwiper", {
	direction: "vertical",
	effect: "fade",
	fadeEffect: { 
		delay: 2500,
		crossFade: true },
	mousewheel: {
	  	releaseOnEdges: true
	}
});
const currentFrame = index => (
    `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`
)
const preLoadImage = () => {
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i)
        
    }
} 
const frameCount = 147;
canvas.height= 758;
canvas.width= 1200;
const img = new Image();
img.src = currentFrame(1);
img.onload = function() {
    context.drawImage(img,0,0)
}
const updateImage = index => {
    img.src = currentFrame(index)
    context.drawImage(img, 0 , 0)
}
window.addEventListener("scroll",()=>{
    const heading = document.querySelector(".heading1");
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex =  Math.min(frameCount - 1 ,  Math.floor(scrollFraction*frameCount));
    requestAnimationFrame(() => updateImage(frameIndex +1))
})
preLoadImage();