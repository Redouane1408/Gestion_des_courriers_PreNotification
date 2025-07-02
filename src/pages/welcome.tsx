'use client'

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion



export function Example() {
    const navigate = useNavigate();

  return (
    <div className="bg-black animate-background-pan h-full w-screen grid-pattern">

      {/* Removed the entire <header> section for the navbar */}

      <div className="relative isolate lg:px-96 mx-7 w-screen ">
        <motion.div // Added motion.div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          initial={{ x: -100, y: -100, rotate: 0 }}
          animate={{ x: 100, y: 100, rotate: 360 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 20,
            ease: "linear",
          }}
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#2e49e4] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </motion.div>

        {/* Division Logos Carousel */}
        

        <div className="mx-auto max-w-2xl py-32 sm:py-2 lg:py-36 sm:justify-center">
          <div className="hidden sm:mt-6 sm:flex sm:justify-center">
            
          </div>
          <div className="text-center scroll-pt-7"> {/* This div already has text-center for centering content */}
            <div className="flex justify-center items-center mb-12 pb-9 gap-x-8"> {/* Added a flex container for the logos */}
              <img src="/logo courriel management-05.svg" alt="Company Logo" className="h-10 w-auto" />
              <h1 className="text-balance text-5xl font-medium tracking-tight text-gray-100 sm:text-xl/8">
              X
              </h1>
              <img src="/Logo-MF.svg" alt="Company Logo" className="h-10 w-auto" />
            </div>
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-100 sm:text-7xl">
              Gestion des courriers
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Notre application doivent être traités, archivés et suivis les courriers de manière efficace pour assurer une traçabilité et une organisation hiérarchique optimale du la division.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                onClick={() => navigate('/login')} // Changed href to onClick for navigation
                className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer" // Added cursor-pointer
              >
                Lancer
              </a>
              
              {/* Removed the "Learn more" link */}
            </div>
          </div>
        </div>
        <motion.div // Added motion.div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          initial={{ x: 100, y: 100, rotate: 0 }}
          animate={{ x: -100, y: -100, rotate: -360 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 20,
            ease: "linear",
          }}
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#80d7ff] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </motion.div>
      </div>
      <div className="py-4 px-96">
    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl mb-8">Nos Divisions</h2>
    <div className="w-full overflow-hidden py-4">
    <div className="flex animate-carousel-logos">
        {/* Placeholder for logos - replace with actual images */}
        <img src="/Logo-divisions-01.svg" alt="Logo 1" className="h-6 mx-8" />
        <img src="/Logo-divisions-02.svg" alt="Logo 2" className="h-6 mx-8" />
        <img src="/Logo-divisions-03.svg" alt="Logo 3" className="h-6 mx-8" />
        <img src="/Logo-divisions-04.svg" alt="Logo 4" className="h-6 mx-8" />
        <img src="/Logo-divisions-05.svg" alt="Logo 5" className="h-6 mx-8" />
        {/* Duplicate logos for seamless loop */}
        <img src="/Logo-divisions-01.svg" alt="Logo 1" className="h-6 mx-8" />
        <img src="/Logo-divisions-02.svg" alt="Logo 2" className="h-6 mx-8" />
        <img src="/Logo-divisions-03.svg" alt="Logo 3" className="h-6 mx-8" />
        <img src="/Logo-divisions-04.svg" alt="Logo 4" className="h-6 mx-8" />
        <img src="/Logo-divisions-05.svg" alt="Logo 5" className="h-6 mx-8" />
    </div>
    </div>
</div>

{/* Section: Pourquoi cette application */}
<div className="py-16 px-96">
    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl mb-8">Pourquoi cette application ?</h2>
    <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Left Column: Image */}
        <div className="md:w-1/2 flex justify-center">
            {/* Replace 'path/to/your/image.png' with the actual path to your image */}
            <img src="/icon-02-02.svg" alt="Application Purpose" className="max-w-full h-auto rounded-lg shadow-lg" />
        </div>
        {/* Right Column: Content */}
        <div className="md:w-1/2 text-gray-300 text-lg leading-relaxed">
            <p className="mb-4">Notre application de gestion des courriers est conçue pour simplifier et optimiser le traitement de vos documents. Fini les tracas liés à la paperasse et aux processus manuels !</p>
            <p className="mb-4">Grâce à une interface intuitive et des fonctionnalités robustes, vous pouvez facilement suivre, archiver et gérer tous vos courriers entrants et sortants. Que vous soyez un administrateur ou un utilisateur régulier, notre solution vous offre une traçabilité complète et une organisation hiérarchique impeccable.</p>
            <p>Améliorez l'efficacité de votre division, réduisez les erreurs et assurez une communication fluide avec notre système de gestion des courriers de pointe.</p>
        </div>
    </div>
</div>

{/* Guide for Admin Users */}
<div className="py-16 px-96">
    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl mb-8">Guide pour les Administrateurs</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1: Gestion des Utilisateurs */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-4">1. Gestion des Utilisateurs</h3>
            <p className="text-gray-300">Apprenez à créer, modifier et supprimer des comptes utilisateurs, ainsi qu'à gérer leurs rôles et permissions.</p>
        </div>
        {/* Card 2: Suivi des Courriers */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-4">2. Suivi et Créer des Courriers</h3>
            <p className="text-gray-300">Visualisez et gérez le statut de tous les courriers, y compris ceux en attente, traités et archivés.</p>
        </div>
        {/* Card 3: Rapports et Statistiques */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-4">3. Rapports et Statistiques</h3>
            <p className="text-gray-300">Accédez à des rapports détaillés sur l'activité des courriers et des utilisateurs pour une meilleure prise de décision.</p>
        </div>
    </div>
</div>

{/* Guide for Regular Users */}
<div className="py-16 px-96">
    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl mb-8">Guide pour les Utilisateurs</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1: Envoi de Courriers */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-4">1. Créer des Courriers</h3>
            <p className="text-gray-300">Découvrez comment soumettre de nouveaux courriers et les acheminer vers les services appropriés.</p>
        </div>
        {/* Card 2: Consultation des Courriers */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-4">2. Consultation des Courriers</h3>
            <p className="text-gray-300">Consultez le statut de vos courriers envoyés et recevez des notifications sur leur progression.</p>
        </div>
        {/* Card 3: Archivage et Recherche */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-4">3. Recherche des Courriers</h3>
            <p className="text-gray-300">Accédez facilement à l'historique de vos courriers et utilisez la fonction de recherche pour retrouver des documents spécifiques.</p>
        </div>
    </div>
</div>
{/* Simple Footer for Support Team */}
    <footer className="bg-black py-8 text-center text-gray-400">
        <p>Pour toute question ou problème, veuillez contacter l'équipe de support à <a href="https://mail.google.com/mail/u/0/#inbox?compose=new" className="text-teal-400 hover:underline">support@mf.gov.dz</a>.</p>
    </footer>

</div>
    
  )
}
