// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion  } from 'framer-motion';
import { useAuth } from '../contexts/auth-context';
import { useToast } from '../hooks/use-toast';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { useTheme } from "@/components/theme-provider";
import { PageTransition } from "@/components/page-transition";
import { Mail, Lock, ArrowRight } from 'lucide-react';
import thumbnail2 from '@/assets/logo-courriel-management-05.png';
import thumbnail3 from '@/assets/Logo-MF.png';


export default function LoginPage() {
    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
// Remove unused useScroll hook since scrollYProgress is not being used
// Remove unused transform since y value is not being used
  
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
      
        try {
          await login(email.trim(), password.trim());
          toast({
            title: "Login Successful",
            description: "Welcome back!",
          });
          navigate('/dashboard');
        } catch (error: any) {
          let errorMessage = "Login failed. Please try again.";
          
          if (error.message.includes('Failed to fetch')) {
            errorMessage = "Could not connect to server. Please check your network.";
          } else if (error.message.includes('Invalid token')) {
            errorMessage = "Authentication failed. Invalid response from server.";
          } else if (error.message) {
            errorMessage = error.message;
          }
      
          toast({
            variant: "destructive",
            title: "Login Error",
            description: errorMessage,
          });
          console.error('Login error details:', error);
        } finally {
          setIsLoading(false);
        }
      };

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

  return (
    <PageTransition>
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen w-screen overflow-hidden relative flex">
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
          
        {/* Left side - Enhanced with glass-morphism */}
        <motion.div 
          className="hidden w-1/2 flex-col items-center justify-center md:flex relative overflow-hidden min-h-screen"
        >
          {/* Glass-morphism overlay */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-lg border rounded-r-3xl border-white/10 " />
          
          {/* Floating Mail Icons */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                variants={{
                  animate: {
                    y: [-10, 10, -10],
                    rotate: [-5, 5, -5],
                    transition: {
                      y: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      },
                      rotate: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }
                  }
                }}
                animate="animate"
                transition={{ delay: i * 0.8 }}
              >
                <Mail className="w-6 h-6 text-white/20" />
              </motion.div>
            ))}
          </div>

          {/* Main content container - properly centered */}
          <div className="flex flex-col items-center justify-center flex-1 relative z-10 px-8">
            <motion.div 
              className="max-w-[300px] text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.img 
                src={thumbnail3}
                alt="Ministry of Finance" 
                width={300} 
                height={100} 
                className="mx-auto"
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
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              
              <motion.div
                className="mt-8 text-center"
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
              
              </motion.div>

              {/* Security Badge */}
              <motion.div
                className="mt-8 flex items-center justify-center gap-2 text-blue-200"
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

              </motion.div>
            </motion.div>
          </div>

          {/* Copyright - positioned at bottom */}
          <motion.h6 
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-white/40 font-thin text-sm text-center px-4 ml-60 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            © 2025 Direction Générale du Budget - Ministère des Finances  République Algérienne Démocratique et Populaire
          </motion.h6>
        </motion.div>

        {/* Right side - Enhanced login form */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-20 lg:px-40 relative">
          {/* Floating elements for right side */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  right: `${15 + i * 20}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                variants={{
                  animate: {
                    y: [-10, 10, -10],
                    rotate: [-5, 5, -5],
                    transition: {
                      y: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      },
                      rotate: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }
                  }
                }}
                animate="animate"
                transition={{ delay: i * 1.2 }}
              >
                <Lock className="w-5 h-5 text-blue-400/20" />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="w-full max-w-md relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Logo Section */}
            <motion.div 
              className="flex justify-center mb-8"
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
              {theme === 'dark' ? (
                <motion.img 
                  src={thumbnail2} 
                  alt="Dark Logo" 
                  width={80} 
                  height={80} 
                  className="opacity-100"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              ) : (
                <motion.img 
                  src={thumbnail2} 
                  alt="Light Logo" 
                  width={80} 
                  height={80} 
                  className="opacity-100"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              )}
            </motion.div>

            <Card className="border-0 shadow-none bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden">
              <motion.div 
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
                <CardHeader className="space-y-1 p-8 pb-4">
                  <CardTitle className="text-3xl font-bold text-white text-center">
                    Connexion
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-center leading-relaxed">
                    Entrez vos identifiants pour accéder au système de gestion des courriers
                  </CardDescription>
                </CardHeader>
              </motion.div>
              
              <CardContent className="p-8 pt-0">
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
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
                  <motion.div 
                    className="space-y-2"
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
                    <Label htmlFor="email" className="text-white font-medium">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="nom@mf.gov.dz"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                        className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-xl h-12 focus:border-blue-400 focus:ring-blue-400/20"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="space-y-2"
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
                    <Label htmlFor="password" className="text-white font-medium">Mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-xl h-12 focus:border-blue-400 focus:ring-blue-400/20"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div 
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
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold rounded-xl h-12 shadow-lg transition-all duration-300 group"
                        disabled={isLoading}
                      >
                        <span className="flex items-center gap-2">
                          {isLoading ? "Connexion en cours..." : "Se connecter"}
                          {!isLoading && (
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          )}
                        </span>
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}