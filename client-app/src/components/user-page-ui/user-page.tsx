import { ArrowLeft, Share2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold">Quiz Site 👍📝</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Edit className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Profile Info */}
      <div className="container px-4 py-8">
        <div className="flex items-start gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202025-02-07%20163423-mKRfII4vRVaDZ7gfX6bW1ISrkHKUgl.png"
              alt="User"
            />
            <AvatarFallback>TD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">TheCoolestDude</h2>
            <p className="text-muted-foreground">Joined June 2023</p>
          </div>
        </div>

        {/* History Section */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold mb-6">История просмотра</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-white">
                <CardHeader className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">Придумати дизайн</h4>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                          Текст
                        </Badge>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                          Концепт
                        </Badge>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">+30 pts</span>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202025-02-07%20163423-mKRfII4vRVaDZ7gfX6bW1ISrkHKUgl.png"
                          alt="Dude"
                        />
                        <AvatarFallback>D</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">Dude</span>
                    </div>
                    <span className="text-sm text-muted-foreground">06.02.2025</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-8">
            {[1, "...", 3, 4, 5, "...", 9].map((page, i) => (
              <Button key={i} variant={page === 4 ? "default" : "ghost"} className="w-8 h-8 p-0">
                {page}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

