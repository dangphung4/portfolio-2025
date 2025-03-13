import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://www.dangtphung.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Dang Phung" />
        <meta property="og:description" content="Hey I'm Dang, a computer science undergraduate pursuing my bachelors at the University of Mary Washington. I am also a software developer with 1 year of professional experience. I am passionate about building web applications and solving real-world problems. Check out my portfolio website to know more about me." />
        <meta property="og:image" content="https://dangtphung.com/dangphung.jpg" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="dangtphung.com" />
        <meta property="twitter:url" content="https://www.dangtphung.com/" />
        <meta name="twitter:title" content="Dang Phung" />
        <meta name="twitter:description" content="Hey I'm Dang, a computer science undergraduate pursuing my bachelors at the University of Mary Washington. I am also a software developer with 1 year of professional experience. I am passionate about building web applications and solving real-world problems. Check out my portfolio website to know more about me." />
        <meta name="twitter:image" content="https://dangtphung.com/dangphung.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 