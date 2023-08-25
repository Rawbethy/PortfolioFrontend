import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAGEContext } from '../../App'
import SimpleImageSlider from 'react-simple-image-slider';
import axios from 'axios';
import Desc from '../../Utils/Descriptions';
import '../styles/general-styles.css'
import '../styles/projects-styles.css';
import '../styles/about-styles.css';

export default function Body() {


  const navigate = useNavigate();
  const { page, setPage, prevPosition, setPrevPosition } = useContext(PAGEContext)

  const home_ref = useRef(null)
  const about_title_ref = useRef(null)
  const about_who_ref = useRef(null)
  const about_hobbies_ref = useRef(null)
  const about_tech_ref = useRef(null)
  const languages_ref = useRef(null)
  const frameworks_ref = useRef(null)
  const softwares_ref = useRef(null)
  const images_ref = useRef(null)
  const projects_title_ref = useRef(null)
  const projects_first_ref = useRef(null)
  const projects_second_ref = useRef(null)

  const [state, setState] = useState({
    width: null,
    height: null,
    images: [],
    isLoading: true
  })

  const [visible, setVisible] = useState({
    home_visible: false,
    about_title_visible: false,
    about_who_visible: false,
    about_hobbies_visible: false,
    about_tech_visible: false,
    languages_visible: false,
    frameworks_visible: false,
    softwares_visible: false,
    images_visible: false,
    projects_title_visible: false,
    projects_first_visible: false,
    projects_second_visible: false
  })

  const ref = {
    'home-title': [home_ref, 'home_visible'],
    'about-title': [about_title_ref, 'about_title_visible'],
    'about-who': [about_who_ref, 'about_who_visible'],
    'about-hobbies': [about_hobbies_ref, 'about_hobbies_visible'],
    'about-tech': [about_tech_ref, 'about_tech_visible'],
    'languages' : [languages_ref, 'languages_visible'],
    'frameworks' : [frameworks_ref, 'frameworks_visible'],
    'softwares' : [softwares_ref, 'softwares_visible'],
    'imageSlider': [images_ref, 'images_visible'],
    'projects-title': [projects_title_ref, 'projects_title_visible'],
    'projects-first': [projects_first_ref, 'projects_first_visible'],
    'projects-second': [projects_second_ref, 'projects_second_visible'],
  }

  const sliderImages = [];
  const languages = ['C', 'C++', 'C#', 'Python', 'JavaScript', 'TypeScript', 'Java', 'HTML5', 'CSS3', 'MySQL', 'PHP', 'R']
  const frameworks = ['Express', 'NodeJS', 'NextJS', 'React', 'AngularJS', 'DotNetCore', 'Django', 'Flask', ]
  const softwares = ['Linux', 'GitHub', 'VSCode', 'VisualStudio', 'NPM', 'Jupyter', 'Docker', 'AmazonWebServices', 'Azure', 'Ubuntu', 'Jenkins', 'Jest']
  const imagePrefix = 'https://drive.google.com/uc?export=view&id=';
  if (state.images && sliderImages.length === 0) {
    state.images.forEach(element => {
      sliderImages.push({ url: imagePrefix.concat(element.imageID) })
    });
  }

  const iconParsing = (icon: string) => {
    var newString: string = '';
    for(const ch of icon) {
      if(ch === '+') {
        newString += 'plus'
      }
      else if(ch === '#') {
        newString += 'sharp'
      }
      else {
        newString += ch
      }
    }
    return newString;
  }

  const updateDimensions = () => {
    const containerElement = images_ref.current;
    if (containerElement) {
      const dimensions = {
        width: containerElement.offsetWidth,
        height: containerElement.offsetHeight
      };
      if (
        !state.width || !state.height ||
        dimensions.width !== state.width ||
        dimensions.height !== state.height
      ) {
        setState((prevState) => ({ ...prevState, width: dimensions.width, height: dimensions.height }));
      }
    }
  }



  useEffect(() => {
    if (prevPosition > 0) {
      const element = document.getElementById('projects')
      if (element) {
        element.scrollIntoView({ block: 'start', behavior: 'auto' })
      }
    }
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
  }, [state.width,])

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('https://api.robert-duque.com:5000/images');
        setState((prevState) => ({ ...prevState, images: res.data }));
        setState((prevState) => ({...prevState, isLoading: false}))
      } catch (error) {
        alert(error);
      }
    };
    getData();
  }, [])

  useEffect(() => {
    setPage(page);
    setPrevPosition(window.pageYOffset);
    if (page === 'Earthquake-Detection') {
      navigate('/Earthquake-Detection')
    }
    else if (page === 'Python-Interpreter') {
      navigate('/Python-Interpreter')
    }
    else if (page === 'Flight-Comparison') {
      navigate('/Flight-Comparison')
    }
    else if (page === 'E-Commerce') {
      navigate('/E-Commerce')
    }
  }, [page])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        let currState = ref[entry.target.className][1];
        setVisible((prevVisible) => ({ ...prevVisible, [currState]: entry.isIntersecting }));
      });
    });
  
    for (const key in ref) {
      if (ref[key][0].current) {
        observer.observe(ref[key][0].current);
      }
    }
  
    return () => {
      observer.disconnect();
    };
  }, [ref])

  return (
    <div className="body">
      <section className="home">
        <div className='home-title' id='home' ref={home_ref}>
          <h1 className={visible.home_visible ? 'animate-after' : 'animate-before'}>✌Greetings!✌</h1>
          <h2 className={visible.home_visible ? 'animate-after' : 'animate-before'}>My name is Robert, I am an aspiring
            web/software developer from Houston who is always seeking opportunites
            to take on tough challenges and implement new technologies</h2>
          <h2 className={visible.home_visible ? 'animate-after' : 'animate-before'}>Please enjoy my personal portfolio!</h2>
        </div>
      </section>
      <section className='about' id='section-about'>
        <div className='about-title' id='about' ref={about_title_ref}>
          <h1 className={visible.about_title_visible ? 'title animate-after' : 'title animate-before'}>About Me</h1>
        </div>
        <div className="about-who" ref={about_who_ref}>
          <div className="sub-title2">
            <h3 className={visible.about_who_visible ? 'animate-after-sub' : 'animate-before'}>Who am I?</h3>
          </div>
          <div className="desc">
            <p className={visible.about_who_visible ? 'animate-after' : 'animate-before'}>{Desc.AboutMe.Who}</p>
          </div>
        </div>
        <div className="about-tech" ref={about_tech_ref}>
          <div className="sub-title2">
            <h3 className={visible.about_tech_visible ? 'animate-after-sub' : 'animate-before'}>Technologies</h3>
          </div>
          <div className="tech-icons">
            <div className="tech-title">
              <h3 className={visible.languages_visible ? 'animate-after' : 'animate-before'}>Languages</h3>
            </div>
            <div className="languages" ref={languages_ref}>
              <div className={visible.languages_visible ? 'row1 animate-after' : 'row1 animate-before'}>
                {languages.slice(0, 4).map((item, index) => (
                  <div className="icon">
                    <i key={index} className={`devicon-`+iconParsing(item.toLowerCase())+`-plain ic${index}`}></i>
                    <h4>{item}</h4>
                </div>
                ))}
              </div>
              <div className={visible.languages_visible ? 'row2 animate-after' : 'row2 animate-before'}>
                {languages.slice(4, 8).map((item, index) => (
                  <div className="icon">
                    <i key={index} className={`devicon-`+iconParsing(item.toLowerCase())+`-plain ic${index}`}></i>
                    <h4>{item}</h4>
                  </div>
                ))}
              </div>
              <div className={visible.languages_visible ? 'row3 animate-after' : 'row3 animate-before'}>
                {languages.slice(8, languages.length + 1).map((item, index) => (
                  <div className="icon">
                    <i key={index} className={`devicon-`+iconParsing(item.toLowerCase())+`-plain ic${index}`}></i>
                    <h4>{item}</h4>
                  </div>
                ))}             
              </div>
            </div>              
            <div className="tech-title">
              <h3 className={visible.frameworks_visible ? 'animate-after' : 'animate-before'}>Frameworks</h3>
            </div>
            <div className="frameworks" ref={frameworks_ref}>
              <div className={visible.frameworks_visible ? 'row1 animate-after' : 'row1 animate-before'}>
                {frameworks.slice(0, 4).map((item, index) => (
                  <div className="icon">
                    <i key={index} className={`devicon-`+iconParsing(item.toLowerCase())+`-plain ic${index}`}></i>
                    <h4>{item}</h4>
                </div>
                ))}
              </div>
              <div className={visible.frameworks_visible ? 'row2 animate-after' : 'row2 animate-before'}>
                {frameworks.slice(4, frameworks.length + 1).map((item, index) => (
                  <div className="icon">
                    <i key={index} className={`devicon-`+iconParsing(item.toLowerCase())+`-plain ic${index}`}></i>
                    <h4>{item}</h4>
                </div>
                ))}
              </div>
            </div>
            <div className="tech-title">
              <h3 className={visible.softwares_visible ? 'animate-after' : 'animate-before'}>Software</h3>
            </div>
            <div className="softwares" ref={softwares_ref}>
              <div className={visible.softwares_visible ? 'row1 animate-after' : 'row1 animate-before'}>
                {softwares.slice(0, 4).map((item, index) => (
                  <div className="icon">
                    <i key={index} className={`devicon-`+iconParsing(item.toLowerCase())+`-plain ic${index}`}></i>
                    <h4>{item}</h4>
                  </div>
                ))}
              </div>
              <div className={visible.softwares_visible ? 'row2 animate-after' : 'row2 animate-before'}>
                {softwares.slice(4, 8).map((item, index) => (
                  <div className="icon">
                    <i key={index} className={`devicon-`+iconParsing(item.toLowerCase())+`-plain ic${index}`}></i>
                    <h4>{item === 'AmazonWebServices' ? "AWS" : item}</h4>
                  </div>
                ))}
              </div>
              <div className={visible.softwares_visible ? 'row3 animate-after' : 'row3 animate-before'}>
                {softwares.slice(8, softwares.length + 1).map((item, index) => (
                  <div className="icon">
                    <i key={index} className={`devicon-`+iconParsing(item.toLowerCase())+`-plain ic${index}`}></i>
                    <h4>{item}</h4>
                  </div>
                ))}
              </div>
            </div>                       
          </div>
        </div>
        <div className='hobbies' id='hobbies'>
          <div className="about-hobbies" ref={about_hobbies_ref}>
            <h3 className={visible.about_hobbies_visible ? 'animate-after-sub' : 'animate-before'}>Hobbies</h3>
          </div>
          <div className="imageSlider" ref={images_ref} style={{ height: `${state.width / 2}px` }}>
            <h3 className={visible.images_visible ? 'animate-after' : 'animate-before'}>Photography</h3>
            {sliderImages.length !== 0 && (<div className={visible.images_visible ? 'animate-after' : 'animate-before'}>
              {state.height && state.width && (visible.images_visible) && (
                <SimpleImageSlider
                  style={{ marginLeft: 'auto', marginRight: 'auto' }}
                  width={state.width / 1.5}
                  height={state.width / 2}
                  images={state.isLoading === false ? sliderImages : []}
                  autoPlay={true}
                  autoPlayDelay={4}
                  showNavs={true}
                  showBullets={false}
                />
              )}
            </div>)}
          </div>
        </div>
      </section>
      <section className="projects">
        <div className="projects-title" id='projects' ref={projects_title_ref}>
          <h1 className={visible.projects_title_visible ? 'title animate-after' : 'title animate-before'}>Projects</h1>
        </div>
        <div className="projects-main">
          <div className="first-row">
            <div className="projects-first" ref={projects_first_ref}>
              <div className="projects-card">
                <div className={visible.projects_first_visible ? 'projects-header animate-after' : 'projects-header animate-before'} >
                  <h2>Flight-Comparison</h2>
                </div>
                <div className={visible.projects_first_visible ? 'projects-content animate-after' : 'projects-content animate-before'} role='button' onClick={() => { setPage('Flight-Comparison') }}>
                  <img src={require('../../Utils/images/Airplane.png')} alt="" />
                  <span className=''>View</span>
                </div>
              </div>
            </div>

            <div className="projects-first" ref={projects_first_ref}>
              <div className="projects-card">
                <div className={visible.projects_first_visible ? 'projects-header animate-after' : 'projects-header animate-before'} >
                  <h2>Earthquake Detection</h2>
                </div>
                <div className={visible.projects_first_visible ? 'projects-content animate-after' : 'projects-content animate-before'} role='button' onClick={() => { setPage('Earthquake-Detection') }}>
                  <img src={require('../../Utils/images/Clustering.png')} alt="" />
                  <span className=''>View</span>
                </div>
              </div>
            </div>
          </div>

          <div className="second-row">

            <div className="projects-second" ref={projects_second_ref}>
              <div className="projects-card">
                <div className={visible.projects_second_visible ? 'projects-header animate-after' : 'projects-header animate-before'} >
                  <h2>E-Commerce Website</h2>
                </div>
                <div className={visible.projects_second_visible ? 'projects-content animate-after' : 'projects-content animate-before'} role='button' onClick={() => { setPage('E-Commerce') }}>
                  <img src={require('../../Utils/images/main-background.jpg')} alt="" style={{ objectFit: 'cover' }} />
                  <span className=''>View</span>
                </div>
              </div>
            </div>

            <div className="projects-second" ref={projects_second_ref}>
              <div className="projects-card">
                <div className={visible.projects_second_visible ? 'projects-header animate-after' : 'projects-header animate-before'} >
                  <h2>Python Interpreter</h2>
                </div>
                <div className={visible.projects_second_visible ? 'projects-content animate-after' : 'projects-content animate-before'} role='button' onClick={() => { setPage('Python-Interpreter') }}>
                  <img src={require('../../Utils/images/parsingTree.png')} alt="" />
                  <span className=''>View</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}