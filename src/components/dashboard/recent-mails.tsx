import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"
import { Mail } from "@/types/mail"

interface RecentMailsProps {
  recentMails: Mail[];
  getStatusColor: (status: string) => string; // Add this line
}

export function RecentMails({ recentMails, getStatusColor }: RecentMailsProps) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Courriers récents</CardTitle>
        <CardDescription>Vous avez cinq (5) courriers récents.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {recentMails.length > 0 ? (
            recentMails.map((mail) => (
              <div key={mail.courielNumber || mail.id} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg" alt="Avatar" />
                  <AvatarFallback>
                    <FileText className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{mail.courielNumber}</p>
                  <p className="text-sm text-muted-foreground">De: {mail.sender}</p>
                </div>
                <div className="ml-auto text-right">
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(mail.status)}`} // Use getStatusColor
                  >
                    {mail.status}
                  </div>
                  <div className="text-xs text-muted-foreground">{mail.historyList[0].timestamp}</div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground">No recent mails found.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
