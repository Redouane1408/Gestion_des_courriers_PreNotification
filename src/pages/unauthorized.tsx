// src/pages/unauthorized.tsx
import { Button } from "@/components/ui/button"
export default function UnauthorizedPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">403 - Non autorisé</h1>
        <p className="mt-4 text-lg">
          Vous n'avez pas la permission d'accéder à cette page
        </p>
        <Button 
          variant="link" 
          onClick={() => window.location.href = '/'}
          className="mt-4"
        >
          Retour à l'accueil
        </Button>
      </div>
    )
  }