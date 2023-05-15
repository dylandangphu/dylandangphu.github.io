import './styles/style.scss'
import { renderBackground, animate } from './scripts/Graphics'
import { startTransition } from './scripts/Animation'

const runApp = async () => {
  await renderBackground();
  animate();
  startTransition();
}


runApp();
