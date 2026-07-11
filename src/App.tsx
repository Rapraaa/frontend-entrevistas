import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Button } from './ui/Button'
import { Chip } from './ui/Chip'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div data-theme="dark" className="bg-base text-fg p-8">
          <h1>Getss started</h1>
          <p className="bg-naranja text-ink p-4 font-mono">
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <Button onClick={() => alert('si sirboxd')} disabled>
          desabilitao
        </Button>
        <Button onClick={() => alert('si sirboxd')} data-theme='dark'>
          aaaaaaa
        </Button>
        <Button onClick={() => alert('si sirboxd')} data-theme='dark' variante='secundario'>
          el pepe
        </Button>
        <Chip tono='lila'>Hola care bola</Chip>
        <Chip tono='verde'>Hola care pan</Chip>
        <Chip tono='rojo'>Hola care pan</Chip>
        <Chip tono='neutro'>Hola care pan</Chip>
        <Chip data-theme= 'dark' tono='neutro'>Hola care pan</Chip>
        <Button onClick={() => alert('si sirboxd')} variante='secundario'>
         Enviar
        </Button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div  className="bg-base text-fg p-8" id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p className="text-3xl font-bold underline text-red-500">Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div data-theme="dark" className="bg-base text-fg p-8" id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
