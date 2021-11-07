//  Intro Section
const html = document.documentElement;
const canvas = document.querySelector('#airpodsImage');
const context = canvas.getContext('2d');


const intro = document.querySelector(".intro");
const airPods = intro.querySelector("#airpodsImage");
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

/* sequence image */

// frame and link of the airpod sequence image
const currentFrame = index => (
    `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`
)
// loop on sequence
const preLoadImage = () => {
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i)
        
    }
} 
// max framecount
const frameCount = 147;
canvas.height= 758;
canvas.width= 1200;
const img = new Image();
img.src = currentFrame(1);
img.onload = function() {
    context.drawImage(img,0,0)
}
// update on scroll
const updateImage = index => {
    img.src = currentFrame(index)
    context.drawImage(img, 0 , 0)
}
// scroll function
window.addEventListener("scroll",()=>{
    const heading = document.querySelector(".heading1");
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex =  Math.min(frameCount - 1 ,  Math.floor(scrollFraction*frameCount));
    requestAnimationFrame(() => updateImage(frameIndex +1))
})
preLoadImage();

/* animation on last section on description */
const options = {
	root: null, // use the document's viewport as the container
	rootMargin: '0px', // % or px - offsets added to each side of the intersection 
	threshold: 0.5 // percentage of the target element which is visible
  }
  
  // Callback docs: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Targeting_an_element_to_be_observed
  let callback = (entries) => { 
	  entries.forEach(entry => {
		  
		  // If entry (box) is visible - according with the params set in `options`
		  // then adds `isVisible` class to box
		  // otherwise removes `isVisible` class
		  
		  if(entry.isIntersecting) {
			  entry.target.classList.add('isVisible');
		  } else {
			  entry.target.classList.remove('isVisible');		
		  }
  
	  });
  }
  
  // Create the intersection observer instance by calling its constructor and passing it a
  // callback function to be run whenever a threshold is crossed in one direction or the other:
  let observer = new IntersectionObserver(callback, options);
  
  // Get all the `.description` from DOM and attach the observer to these
  document.querySelectorAll('.description')
	  .forEach(description => { observer.observe(description) });