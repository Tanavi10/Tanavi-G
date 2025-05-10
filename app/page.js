import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import emailjs from 'emailjs-com';

async function getData() {
  const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json();

  const filtered = data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5);

  return filtered;
};

// Function to handle email submission via EmailJS
const sendEmail = (e) => {
  e.preventDefault();

  // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_USER_ID' with your EmailJS credentials
  emailjs.sendForm('service_wja94jo', 'template_xyufstw', e.target, '4I4dl675kKUt71KKzrC_q')
    .then((result) => {
        console.log('Message sent: ', result.text);
    }, (error) => {
        console.error('Error sending message: ', error.text);
    });
};

export default async function Home() {
  const blogs = await getData();

  return (
    <div suppressHydrationWarning>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      {/* <Blog blogs={blogs} /> */}

      {/* Pass sendEmail to the ContactSection so it can handle form submissions */}
      <ContactSection sendEmail={sendEmail} />
    </div>
  )
};
