'use client'

import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Mail, Archive, Users, BarChart3, Shield, Zap, ArrowRight, FileText, Clock, CheckCircle,
  UserPlus, Settings, Eye, Send, Search, Bell, Lock, ChevronRight
} from 'lucide-react';

// Import thumbnails as modules for better build optimization
import thumbnail1 from 'public/videos/thumbnails/Overview-Cover.png';
import thumbnail2 from '../assets/logo-courriel-management-05.svg';
import thumbnail3 from '../assets/Logo-MF.svg';
// Fallback thumbnail for videos without specific thumbnails

export function Example() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const roadmapRef = useRef(null);
  const guidesRef = useRef(null);
  
  // Typing animation state
  const [displayText, setDisplayText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  
  const words = ['Courriers', 'Archives'];
  
  const heroInView = useInView(heroRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true });
  const statsInView = useInView(statsRef, { once: true });
  const roadmapInView = useInView(roadmapRef, { once: true });
  const guidesInView = useInView(guidesRef, { once: true });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Typing animation effect with optimized delays
  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let timeoutId: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < currentWord.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 80); // Reduced typing speed from 100ms to 80ms
      } else {
        // Finished typing, wait then start erasing
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 450); // Reduced pause from 1000ms to 600ms
      }
    } else {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 80); // Reduced erasing speed from 50ms to 30ms
      } else {
        // Finished erasing, move to next word
        timeoutId = setTimeout(() => {
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setIsTyping(true);
        }, 150); // Reduced delay from 300ms to 150ms
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isTyping, currentWordIndex, words]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  /* const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-5, 5, -5],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }; */

  const roadmapSteps = [
    {
      step: "01",
      title: "Connexion",
      description: "Connectez-vous avec vos identifiants fournis par l'administrateur",
      icon: Lock,
      color: "from-blue-500 to-blue-600"
    },
    {
      step: "02",
      title: "Tableau de bord",
      description: "Accédez à votre tableau de bord personnalisé avec vue d'ensemble",
      icon: BarChart3,
      color: "from-purple-500 to-purple-600"
    },
    {
      step: "03",
      title: "Nouveau courrier",
      description: "Créez un nouveau courrier avec toutes les informations nécessaires",
      icon: FileText,
      color: "from-green-500 to-green-600"
    },
    {
      step: "04",
      title: "Routage",
      description: "Définissez les destinataires et les circuits de validation",
      icon: Send,
      color: "from-orange-500 to-orange-600"
    },
    {
      step: "05",
      title: "Suivi",
      description: "Suivez l'état d'avancement et recevez des notifications",
      icon: Eye,
      color: "from-teal-500 to-teal-600"
    },
    {
      step: "06",
      title: "Archivage",
      description: "Archivage automatique avec recherche et classification",
      icon: Archive,
      color: "from-red-500 to-red-600"
    }
  ];

  const adminGuideSteps = [
    {
      title: "Gestion des utilisateurs",
      description: "Créez, modifiez et gérez les comptes utilisateurs de votre direction",
      icon: UserPlus,
      details: [
        "Créer de nouveaux comptes utilisateurs",
        "Attribuer les rôles et permissions",
        "Gérer les mots de passe et accès",
        "Désactiver ou supprimer des comptes"
      ]
    },
    {
      title: "Configuration système",
      description: "Configurez les paramètres de votre direction et sous-directions",
      icon: Settings,
      details: [
        "Définir la structure organisationnelle",
        "Configurer les circuits de validation",
        "Paramétrer les notifications",
        "Gérer les modèles de documents"
      ]
    },
    {
      title: "Supervision",
      description: "Surveillez l'activité et les performances de votre direction",
      icon: Eye,
      details: [
        "Consulter les tableaux de bord",
        "Analyser les statistiques d'usage",
        "Suivre les délais de traitement",
        "Générer des rapports d'activité"
      ]
    }
  ];

  const userGuideSteps = [
    {
      title: "Création de courriers",
      description: "Créez et envoyez vos courriers officiels en quelques étapes",
      icon: FileText,
      details: [
        "Remplir les informations de base",
        "Sélectionner les destinataires",
        "Définir les dates importantes",
        "Joindre les pièces nécessaires"
      ]
    },
    {
      title: "Suivi des courriers",
      description: "Suivez l'état d'avancement de vos courriers en temps réel",
      icon: Search,
      details: [
        "Consulter l'historique complet",
        "Voir les étapes de validation",
        "Recevoir des notifications",
        "Identifier les blocages"
      ]
    },
    {
      title: "Gestion des archives",
      description: "Accédez et gérez vos courriers archivés facilement",
      icon: Archive,
      details: [
        "Rechercher dans les archives",
        "Filtrer par critères",
        "Télécharger les documents",
        "Consulter les métadonnées"
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen w-screen overflow-hidden relative">
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="w-full h-full opacity-[0.2]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        {/* Animated Grid Overlay */}
        <motion.div 
          className="w-full h-full opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px', '0px 0px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6"
        style={{ y, opacity }}
      >
        <motion.div 
          className="text-center max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
        >
          {/* Logo Section */}
          <motion.div 
            className="flex justify-center items-center mb-12 gap-x-8 pb-24"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  type: "spring" as const,
                  stiffness: 100
                }
              }
            }}
          >
            <motion.img 
              src={thumbnail2} 
              alt="Mail Management Logo" 
              className="h-12 w-auto"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.div
              className="text-4xl font-bold text-white"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              ×
            </motion.div>
            <motion.img 
              src={thumbnail3} 
              alt="Ministry Logooooooi" 
              className="h-12 w-auto"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-white via-blue-100 to-teal-200 bg-clip-text text-transparent mb-4"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  type: "spring" as const,
                  stiffness: 100
                }
              }
            }}
          >
            Ges des
            <br />
            <motion.span
              className="inline-block"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                background: 'linear-gradient(90deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)',
                backgroundSize: '300% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {displayText}
              <motion.span
                className="inline-block w-1 h-20 bg-current ml-2"
                animate={{
                  opacity: showCursor ? 1 : 0
                }}
                transition={{
                  duration: 0.1
                }}
                style={{
                  background: 'linear-gradient(90deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)',
                  backgroundSize: '300% 100%'
                }}
              />
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  type: "spring" as const,
                  stiffness: 100
                }
              }
            }}
          >
            Améliorez la gestion de vos courriers grâce à une solution fiable et performante.
          </motion.p>
          <motion.p 
            className="text-xl md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  type: "spring" as const,
                  stiffness: 100
                }
              }
            }}
          >
        Suivi en temps réel, Traçabilité complète, Archivage optimisé et d'un Suivi collaboratif simplifié: tout est conçu pour gagner du temps et améliorer l'efficacité.
          </motion.p>

          {/* CTA Button */}
          <motion.div 
            className="flex justify-center"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  type: "spring" as const,
                  stiffness: 100
                }
              }
            }}
          >
            <motion.button
              onClick={() => navigate('/login')}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white text-lg font-semibold rounded-2xl shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative flex items-center gap-2">
                Commencer maintenant
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </motion.div>

          {/* Floating Mail Icons */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      type: "spring" as const,
                      stiffness: 100
                    }
                  }
                }}
                animate="animate"
                transition={{ delay: i * 0.5 }}
              >
                <Mail className="w-8 h-8 text-blue-400/30" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        ref={statsRef}
        className="py-20 px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center text-white mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            Performance en temps réel
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: FileText, value: "10K+", label: "Courriers traités", color: "from-blue-500 to-blue-600" },
              { icon: Clock, value: "85%", label: "Temps économisé", color: "from-teal-500 to-teal-600" },
              { icon: Users, value: "500+", label: "Utilisateurs actifs", color: "from-purple-500 to-purple-600" },
              { icon: CheckCircle, value: "99.9%", label: "Fiabilité", color: "from-green-500 to-green-600" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <motion.div 
                    className="text-3xl font-bold text-white mb-2"
                    initial={{ scale: 0 }}
                    animate={statsInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Roadmap Section */}
      <motion.section 
        ref={roadmapRef}
        className="py-20 px-6"
        initial={{ opacity: 0 }}
        animate={roadmapInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-5xl font-bold text-center text-white mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={roadmapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          >
            Comment utiliser la plateforme
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={roadmapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            Suivez ces étapes simples pour maîtriser la gestion de vos courriers
          </motion.p>
          
          <div className="relative">
            {/* Roadmap Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-teal-500 rounded-full opacity-30" />
            
            <div className="space-y-12">
              {roadmapSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <motion.div 
                      className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <step.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{step.description}</p>
                    </motion.div>
                  </div>
                  
                  {/* Step Number */}
                  <motion.div 
                    className="relative z-10 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-2xl"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {step.step}
                  </motion.div>
                  
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        ref={featuresRef}
        className="py-20 px-6"
        initial={{ opacity: 0 }}
        animate={featuresInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-5xl font-bold text-center text-white mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          >
            Pourquoi cette application ?
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Archive,
                title: "Archivage Intelligent",
                description: "Système d'archivage automatisé avec recherche avancée et classification intelligente des documents. Retrouvez vos courriers en quelques secondes grâce à notre moteur de recherche puissant.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Shield,
                title: "Sécurité Renforcée",
                description: "Chiffrement de bout en bout, authentification multi-facteurs et audit complet des accès. Vos données sont protégées selon les standards les plus élevés de sécurité.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Zap,
                title: "Performance Optimale",
                description: "Interface ultra-rapide, synchronisation en temps réel et notifications intelligentes. Gagnez du temps avec des workflows automatisés et une expérience utilisateur fluide.",
                gradient: "from-orange-500 to-red-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden h-full">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />
                  
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Guides Section */}
      <motion.section 
        ref={guidesRef}
        className="py-20 px-6"
        initial={{ opacity: 0 }}
        animate={guidesInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-5xl font-bold text-center text-white mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={guidesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          >
            Guides d'utilisation
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Admin Guide */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={guidesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Guide pour les Administrateur</h3>
                </div>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  En tant qu'administrateur, vous avez accès à des fonctionnalités avancées pour gérer votre direction et superviser les activités.
                </p>
                
                <div className="space-y-6">
                  {adminGuideSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={guidesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <step.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-white mb-2">{step.title}</h4>
                          <p className="text-gray-400 mb-4">{step.description}</p>
                          <ul className="space-y-2">
                            {step.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-center gap-2 text-gray-300">
                                <ChevronRight className="w-4 h-4 text-orange-400" />
                                <span className="text-sm">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* User Guide */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={guidesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Guide pour les Utilisateurs</h3>
                </div>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Découvrez comment utiliser efficacement la plateforme pour gérer vos courriers au quotidien.
                </p>
                
                <div className="space-y-6">
                  {userGuideSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={guidesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <step.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-white mb-2">{step.title}</h4>
                          <p className="text-gray-400 mb-4">{step.description}</p>
                          <ul className="space-y-2">
                            {step.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-center gap-2 text-gray-300">
                                <ChevronRight className="w-4 h-4 text-teal-400" />
                                <span className="text-sm">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Video Tutorial Section */}
      <motion.section 
        className="py-20 px-6 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-full px-6 py-3 border border-white/10 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-purple-300 font-medium">Tutoriels Vidéo</span>
            </motion.div>
            <h2 className="text-5xl font-bold text-white mb-6">
              Apprenez à utiliser la
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> plateforme</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Découvrez toutes les fonctionnalités de notre système de gestion des courriers 
              grâce à nos tutoriels vidéo détaillés et faciles à suivre.
            </p>
          </motion.div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Introduction à la plateforme",
                description: "Découvrez l'interface et les fonctionnalités principales",
                duration: "0:28",
                videoSrc: "/videos/Overview.mp4",
                thumbnail: thumbnail1, // Use imported thumbnail
                category: "Overview",

                views: "+1k"
              },
              {
                title: "Créer et envoyer un courrier",
                description: "Guide complet pour rédiger et envoyer vos courriers",
                duration: "8:45",
                videoSrc: "/videos/create-mail.mp4",
                /* thumbnail: thumbnailCreateMail, */ // Use imported thumbnail
                category: "Essentiel",
                views: "2.1k"
              },
              {
                title: "Gestion des archives",
                description: "Organisez et retrouvez facilement vos documents",
                duration: "6:20",
                videoSrc: "/videos/archive-management.mp4",
                /* thumbnail: thumbnailArchiveManagement, */ // Use imported thumbnail
                category: "Avancé",
                views: "890"
              },
              {
                title: "Tableau de bord et statistiques",
                description: "Analysez vos données et suivez vos performances",
                duration: "7:15",
                videoSrc: "/videos/dashboard-stats.mp4",
                /* thumbnail: thumbnailDashboardStats, */ // Use imported thumbnail
                category: "Analyse",
                views: "1.5k"
              },
              {
                title: "Gestion des utilisateurs",
                description: "Administrez les comptes et les permissions",
                duration: "9:30",
                videoSrc: "/videos/user-management.mp4",
                /* thumbnail: thumbnailUserManagement, */ // Use imported thumbnail
                category: "Admin",
                views: "750"
              },
              {
                title: "Sécurité et bonnes pratiques",
                description: "Protégez vos données et optimisez votre workflow",
                duration: "4:50",
                videoSrc: "/videos/security-practices.mp4",
                /* thumbnail: thumbnailSecurityPractices, */ // Use imported thumbnail
                category: "Sécurité",
                views: "980"
              }
            ].map((video, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedVideo(video.videoSrc)}
              >
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300">
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 overflow-hidden">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback to placeholder if thumbnail doesn't exist
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    
                    {/* Fallback placeholder */}
                    <div className="hidden w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center absolute inset-0">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <FileText className="w-8 h-8 text-white/60" />
                        </div>
                        <p className="text-white/40 text-sm">Aperçu vidéo</p>
                      </div>
                    </div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                      <motion.div
                        className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="w-0 h-0 border-l-[12px] border-l-gray-800 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
                      </motion.div>
                    </div>
                    
                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        video.category === 'Overview' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                        video.category === 'Essentiel' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                        video.category === 'Avancé' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                        video.category === 'Admin' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                        video.category === 'Analyse' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                        'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                      }`}>
                        {video.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {video.views} vues
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Video Modal */}
      {selectedVideo && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 max-w-4xl w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video">
              <video
                src={selectedVideo}
                controls
                preload="metadata"
                playsInline
                className="w-full h-full"
                onError={(e) => {
                  console.error('Error loading video:', selectedVideo, e);
                }}
              >
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors text-xl"
              >
                ×
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <motion.button
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-2xl transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Voir tous les tutoriels</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <p className="text-gray-400 text-sm mt-4">
              Plus de 15 heures de contenu pour maîtriser la plateforme
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Comprehensive Footer */}
      <motion.footer 
        className="bg-gradient-to-b from-black/50 to-black/80 backdrop-blur-lg border-t border-white/10 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Company Information */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3">
                    <motion.img 
                    src={thumbnail2}
                    alt="Mail Management Logo" 
                    className="h-12 w-auto"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    />              
                </div>
              <p className="text-gray-300 leading-relaxed">
                Plateforme moderne de gestion des courriers pour le Ministère des Finances. 
                Optimisez vos processus administratifs avec notre solution innovante.
              </p>
              <div className="flex items-center gap-2 text-teal-400">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Sécurisé et Confidentiel</span>
              </div>
            </motion.div>

            {/* Quick Links */}
            {/* <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-xl font-semibold text-white mb-4">Liens Rapides</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Tableau de Bord', href: '/dashboard' },
                  { name: 'Nouveau Courrier', href: '/courriers/new' },
                  { name: 'Archives', href: '/archives' },
                  { name: 'Utilisateurs', href: '/users' },
                  { name: 'Statistiques', href: '/stats' },
                  { name: 'Paramètres', href: '/settings' }
                ].map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-teal-400 transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:text-teal-400 transition-colors" />
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div> */}

            {/* Support & Contact */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-xl font-semibold text-white mb-4">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-teal-400 mt-1" />
                  <div>
                    <p className="text-gray-300 text-sm">Email Support</p>
                    <a href="mailto:support@mf.gov.dz" className="text-teal-400 hover:text-teal-300 transition-colors">
                      support@mf.gov.dz
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Bell className="w-5 h-5 text-teal-400 mt-1" />
                  <div>
                    <p className="text-gray-300 text-sm">Support Technique</p>
                    <a href="mailto:tech@mf.gov.dz" className="text-teal-400 hover:text-teal-300 transition-colors">
                      tech@mf.gov.dz
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-teal-400 mt-1" />
                  <div>
                    <p className="text-gray-300 text-sm">Heures d'ouverture</p>
                    <p className="text-white text-sm">Dimanche-Jeudi: 8h00 - 17h00</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* System Information */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-xl font-semibold text-white mb-4">Informations Système</h4>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">Système Opérationnel</span>
                  </div>
                  <p className="text-gray-300 text-xs">Dernière mise à jour: 15 Jan 2024</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Version</span>
                    <span className="text-white text-sm font-medium">v1.0.0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Uptime</span>
                    <span className="text-green-400 text-sm font-medium">99.9%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Utilisateurs Actifs</span>
                    <span className="text-teal-400 text-sm font-medium">12</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          {/* <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {[
              { icon: FileText, title: 'Gestion Courriers', desc: 'Création et suivi' },
              { icon: Archive, title: 'Archivage', desc: 'Stockage sécurisé' },
              { icon: Search, title: 'Recherche', desc: 'Recherche avancée' },
              { icon: BarChart3, title: 'Statistiques', desc: 'Rapports détaillés' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <feature.icon className="w-8 h-8 text-teal-400 mb-3 group-hover:scale-110 transition-transform" />
                <h5 className="text-white font-semibold mb-1">{feature.title}</h5>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div> */}

          {/* Security & Compliance */}
          {/* <motion.div
            className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl p-8 border border-red-500/20 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white">Sécurité & Conformité</h4>
                <p className="text-gray-300">Protection des données gouvernementales</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-green-400" />
                </div>
                <h5 className="text-white font-medium mb-2">Chiffrement SSL/TLS</h5>
                <p className="text-gray-400 text-sm">Communications sécurisées</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-8 h-8 text-blue-400" />
                </div>
                <h5 className="text-white font-medium mb-2">Authentification 2FA</h5>
                <p className="text-gray-400 text-sm">Double authentification</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-purple-400" />
                </div>
                <h5 className="text-white font-medium mb-2">Conformité RGPD</h5>
                <p className="text-gray-400 text-sm">Protection des données</p>
              </div>
            </div>
          </motion.div> */}

          {/* Bottom Section */}
          <motion.div
            className="border-t border-white/10 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm mb-2">
                  © 2025 MP-Direction Générale du Budget - Ministère des Finances - République Algérienne Démocratique et Populaire
                </p>
                <p className="text-gray-500 text-xs">
                  Tous droits réservés. Développé pour l'administration.
                </p>
              </div>
              <div className="flex items-center gap-6">
                <motion.a
                  href="/privacy"
                  className="text-gray-400 hover:text-teal-400 text-sm transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  Politique de Confidentialité
                </motion.a>
                <motion.a
                  href="/terms"
                  className="text-gray-400 hover:text-teal-400 text-sm transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  Conditions d'Utilisation
                </motion.a>
                <motion.a
                  href="/help"
                  className="text-gray-400 hover:text-teal-400 text-sm transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  Aide
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}