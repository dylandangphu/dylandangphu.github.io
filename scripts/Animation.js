import { renderBackground, renderSpace } from './Graphics'

export const timeline = gsap.timeline({ defaults: { duration: 1 }})

export const viewSpace = async () => {
  await timeline.to(['.canvas','.mainTitle','.contentContainer', '#SpaceOverlay'],1,{ opacity: 0})
  .to(['.canvas', '.frame'],1,{width:'100%', height:'100%', margin:'0'})

  await renderSpace()

  timeline.to(['.canvas','.contentContainer'],2,{ opacity: 1})
}

export const backHome = async () => {
  await timeline.to(['.canvas', '.contentContainer', '#SpaceOverlay'],1,{ opacity: 0})
  .to(['.canvas', '.frame'],1,{width:'calc(100% - 2.50em)', height:'calc(100% - 2.50em)', margin:'1.25em'})

  await renderBackground()

  timeline.to(['.canvas','.contentContainer', '.mainTitle'],1,{ opacity: 1})
}

export const startTransition = () => {
  timeline.to(['.frame','.mainTitle'], { opacity: 1, delay:1 })
}