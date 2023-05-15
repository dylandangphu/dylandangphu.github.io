import NavList from '../templates/NavList.html?raw';
import Experiences from '../templates/Experiences.html?raw'
import Contact from '../templates/Contact.html?raw'
import Bio from '../templates/Bio.html?raw';
import Controls from '../templates/Controls.html?raw'
import Overlay from '../templates/Overlay.html?raw'
import { viewSpace, backHome } from './Animation'
import { stage } from './Graphics'
import Alpine from 'alpinejs'

const titleContent = {
  title: `<h1>Chi Dang Studios</h1>`,
  subtitle: `<p>Design | Engineering | Sustainability</p>`,
}

const viewOptions = [
  { id: 0, value: 'Home', icon: '<i class="fa-solid fa-house-chimney"></i>', content: Bio},
  { id: 1, value: 'Experience', icon: '<i class="fa-solid fa-bars-progress"></i>', content: Experiences},
  { id: 2, value: 'Contact', icon: '<i class="fa-solid fa-address-card"></i>', content: Contact },
  { id: 3, value: 'Space', icon: '<i class="fa-solid fa-shuttle-space"></i>', content: Controls },
]

const expListItems = [
  { id: 0, 
    title: 'Perennial', 
    info: '2022-2023 | Full Stack Engineer', 
    description: 'Full-Stack | Data Visualization | Product | UI/UX',
    summary: `
      <div>
        I designed and built our MRV web platform for soil-based carbon removal which was featured on <a href="https://time.com/collection/best-inventions-2022/6228334/perennial/" target="_blank">TIME's Best Inventions of 2022.</a>
        From an empty canvas to a production app - I engaged in UI/UX research and refined design requirements in tandem with crafting each workflow from business logic through platform interaction.
      </div>
    `, 
    expanded: false,
    markets: [
      { id: 0, label: 'Geospatial', icon: '<i class="fa-solid fa-satellite"></i>' },
      { id: 1, label: 'AI/ML', icon: '<i class="fa-solid fa-brain"></i>' },
      { id: 2, label: 'Ag Tech', icon: '<i class="fa-solid fa-seedling"></i>' },
      { id: 3, label: 'Enterprise', icon: '<i class="fa-solid fa-building"></i>' },
    ],
    tech: [
      { id: 0, label: 'React', icon: '<i class="fa-brands fa-react"></i>' },
      { id: 1, label: 'Python | Flask', icon: '<i class="fa-brands fa-python"></i>' },
      { id: 2, label: 'Sass', icon: '<i class="fa-brands fa-sass"></i>' },
      { id: 3, label: 'Docker', icon: '<i class="fa-brands fa-docker"></i>' },
      { id: 4, label: 'AWS', icon: '<i class="fa-brands fa-aws"></i>' },
      { id: 5, label: 'postgreSQL', icon: '<i class="fas fa-database"></i>'}
    ],
  },
  { id: 1, 
    title: 'Slalom', 
    info: '2021-2023 | Senior Data Engineer', 
    description: 'Cloud Architecture | Data Engineering | DevOps', 
    summary: `
      <div>
        As a senior data consultant at Slalom Build, I worked with clients to design, develop, and deliver data solutions using agile software development combined with extensive client engagement and technical discovery.
        Each bespoke project required quick learning, consistent client touchpoints, hands-on development, high-level demos, and detailed technical knowledge-transfer sessions.
      </div> 
    `,
    expanded: false,
    markets: [
      { id: 0, label: 'Big Data', icon: '<i class="fa-solid fa-server"></i>' },
      { id: 1, label: 'AI/ML', icon: '<i class="fa-solid fa-brain"></i>' },
      { id: 2, label: 'Consulting', icon: '<i class="fa-solid fa-handshake"></i>' },
      { id: 3, label: 'Tech', icon: '<i class="fa-solid fa-microchip"></i>' },
    ],
    tech: [
      { id: 0, label: 'Python', icon: '<i class="fa-brands fa-python"></i>' },
      { id: 1, label: 'AWS', icon: '<i class="fa-brands fa-aws"></i>' },
      { id: 2, label: 'Bash', icon: '<i class="fa-brands fa-linux"></i>' },
      { id: 3, label: 'Docker', icon: '<i class="fa-brands fa-docker"></i>' },
      { id: 4, label: 'Git', icon: '<i class="fa-brands fa-github"></i>' },
      { id: 5, label: 'Spark', icon: '<i class="fas fa-database"></i>'}
    ],
  },
  { id: 2, 
    title: 'Aquilon', 
    info: '2019-2021 | Senior Software Architect', 
    description: 'Data | Product | Operations',
    summary: `
      <div>
        At Aquilon, an early-stage fintech start-up focused on digitizing commodities trading/ESG activity, I began in customer success - managing relationships clients and providing quick on-demand support.
        As I pivoted into a more technical role, I was able to design, develop and scale our trading risk platform which was named <a href="https://www.risk.net/awards/5247186/innovation-of-the-year-energy-settlement-network-by-aquilon-energy-services" target="_blank">Innovation of the Year by the industry</a>
      </div>
    `, 
    expanded: false,
    markets: [
      { id: 0, label: 'Trade Finance', icon: '<i class="fa-solid fa-money-bill-transfer"></i>' },
      { id: 1, label: 'Commodities', icon: '<i class="fa-solid fa-industry"></i>' },
      { id: 2, label: 'Computer Vision', icon: '<i class="fa-solid fa-eye"></i>' },
      { id: 3, label: 'AI/ML', icon: '<i class="fa-solid fa-brain"></i>' },
    ],
    tech: [
      { id: 0, label: 'Angular', icon: '<i class="fa-brands fa-angular"></i>' },
      { id: 1, label: 'Python', icon: '<i class="fa-brands fa-python"></i>' },
      { id: 2, label: 'Azure | .NET | C#', icon: '<i class="fa-brands fa-microsoft"></i>' },
      { id: 3, label: 'Docker', icon: '<i class="fa-brands fa-docker"></i>' },
      { id: 4, label: 'Excel | VBA | Power BI', icon: '<i class="fa-solid fa-chart-simple"></i>' },
      { id: 5, label: 'SQL Server', icon: '<i class="fas fa-database"></i>'}
    ],
   },
]

const spaceStages = [
  { id:0, value: ' ', content: `
    The visions we offer our children shape the future.<br>
    It matters what those visions are.<br>
    Often they become self-fulfilling prophecies.<br>
    Dreams are maps.
  ` },
  { id:1, value: ' ', content: `
    The significance of our lives and our fragile planet<br>
    is then determined only by our own wisdom and courage.
  ` },
  { id:2, value: ' ', content: `
    Look again at that dot.<br>
    That's here.<br>
    That's home.<br>
    That's us... on a mote of dust suspended in a sunbeam.
  ` },
  { id:3, value: ' ', content: `
    To me, it underscores our responsibility to deal more kindly with one another,<br>
    and to preserve and cherish the pale blue dot,<br>
    the only home we've ever known.
  ` },
]

Alpine.store('current', {
  view: { id: 0, value: 'Home', content: Bio},
  overlay: { id:0, value: '0', content: `If people sat outside and looked at the stars each night, I'll bet they'd live a lot differently.` },
  async setView(id) {
    
    if (id == '3') { 
      await viewSpace();
      this.view = viewOptions[parseInt(id)];
      this.overlay = spaceStages[0];
      await stage(0);
    } else {
      this.view = viewOptions[parseInt(id)];
    }
  },
  async _backHome() {
    await backHome()
    this.view = viewOptions[0];
  },
  async stage(id) {
    await stage(parseInt(id));
    this.overlay = spaceStages[parseInt(id)];
  },
  isCurrentView(viewValue) {
    return this.view.value === viewValue;
  }
})

Alpine.data('canvasData', () => (
  {
    options: spaceStages
  }
));

Alpine.data('titleData', () => (
  { 
    title: titleContent.title,
    subTitle: titleContent.subtitle,
    nav: NavList,
    show: false,
  }
));

Alpine.data('navData', () => (
  { 
    options: viewOptions, 
  }
));

Alpine.data('expData', () => (
  { items: expListItems }
));

Alpine.data('overlayData', () => (
  { content: Overlay,
    show: false,
  }
));

Alpine.start()
