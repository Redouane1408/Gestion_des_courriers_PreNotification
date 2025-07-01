// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';
import { useToast } from '../hooks/use-toast';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { motion } from 'framer-motion'; // Import motion
import { useTheme } from "@/components/theme-provider"

export default function LoginPage() {
    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
  
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

  return (
    <div className="flex min-h-screen w-screen ">
        
      {/* Left side - Dark background with logo */}
      <div className="hidden w-1/2 bg-gradient-to-tr from-[#1568d4] to-[#015169] opacity-100 flex-col items-center justify-center md:flex ">
            <div className="max-w-[300px]">
                <img src="/Logo-MF.svg" alt="Ministry of Finance" width={300} height={100} className="mx-auto" />
                
                <h6 className="fixed bottom-0 left-80 w-full text-gray-300 font-thin text-sm read-only:bottom-0"> © Copyright 2024 DGB - Ministère de la Finance </h6>
            </div>

      
        
        
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-20 lg:px-40">
        <Card className="w-full max-w-md border-0 shadow-none">
            <div className="max-w-[300px]">
                
                {theme === 'dark' ? (
                  <img src="logo courriel management-05.svg" alt="Dark Logo" width={100} height={100} className="opacity-100 mx-44 fixed top-52" />
                ) : (
                  <img src="logo courriel management-04.svg" alt="Light Logo" width={100} height={100} className="opacity-15 mx-44 fixed top-52" />
                )}
            </div>
          <CardHeader className="space-y-1 p-0 pb-4">
            
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>Entrez votre email et mot de passe pour accéder au système</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nom@mf.gov.dz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-tr from-[#0457c4ce] to-[#015169] opacity-70 hover:bg-sky-700" 
                disabled={isLoading}
              >
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}