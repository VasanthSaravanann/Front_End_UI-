import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <Brain className="h-16 w-16 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Test Your Knowledge</span>
          <span className="block text-blue-600 dark:text-blue-400">With Interactive Quizzes</span>
        </h1>
        <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
          Challenge yourself with our engaging quizzes, compete with others, and track your progress in real-time.
        </p>
        
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Real-time Competition</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Compete with players worldwide and see live rankings.</p>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Various Categories</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Choose from multiple topics and difficulty levels.</p>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Monitor your improvement with detailed statistics.</p>
          </Card>
        </div>

        <div className="mt-12">
          <Link href="/quiz">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Start Quiz Now
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}