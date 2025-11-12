"use client"

import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F5EDE4] to-[#EFE5DA]">
      <div className="container mx-auto px-4 py-12">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-12">
          <h1 className="text-2xl font-bold text-[#3A2E2E]">
            MediNotes Pro
          </h1>
          <div>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-[#C8A27B] hover:bg-[#B08968] text-white font-medium py-2 px-6 rounded-lg transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-4">
                <Link 
                  href="/product" 
                  className="bg-[#C8A27B] hover:bg-[#B08968] text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Go to App
                </Link>
                <UserButton showName={true} />
              </div>
            </SignedIn>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="text-center py-16">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-[#B08968] to-[#8C6B4F] bg-clip-text text-transparent mb-6">
            Transform Your
            <br />
            Consultation Notes
          </h2>
          <p className="text-xl text-[#6B5E55] mb-12 max-w-2xl mx-auto">
            AI-powered assistant that generates professional summaries, action items, and patient communications from your consultation notes
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            {/* Feature 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#C8A27B] to-[#B08968] rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-[#FDF8F4] p-6 rounded-xl shadow-lg border border-[#E8DCC9] backdrop-blur-sm">
                <div className="text-3xl mb-4">📋</div>
                <h3 className="text-lg font-semibold mb-2 text-[#3A2E2E]">
                  Professional Summaries
                </h3>
                <p className="text-[#6B5E55] text-sm">
                  Generate comprehensive medical record summaries from your notes
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#D1B694] to-[#C8A27B] rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-[#FDF8F4] p-6 rounded-xl shadow-lg border border-[#E8DCC9] backdrop-blur-sm">
                <div className="text-3xl mb-4">✅</div>
                <h3 className="text-lg font-semibold mb-2 text-[#3A2E2E]">
                  Action Items
                </h3>
                <p className="text-[#6B5E55] text-sm">
                  Clear next steps and follow-up actions for every consultation
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#B08968] to-[#8C6B4F] rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-[#FDF8F4] p-6 rounded-xl shadow-lg border border-[#E8DCC9] backdrop-blur-sm">
                <div className="text-3xl mb-4">📧</div>
                <h3 className="text-lg font-semibold mb-2 text-[#3A2E2E]">
                  Patient Emails
                </h3>
                <p className="text-[#6B5E55] text-sm">
                  Draft clear, patient-friendly email communications automatically
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-gradient-to-r from-[#C8A27B] to-[#B08968] hover:from-[#B08968] hover:to-[#8C6B4F] text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105">
                Start Free Trial
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/product">
              <button className="bg-gradient-to-r from-[#C8A27B] to-[#B08968] hover:from-[#B08968] hover:to-[#8C6B4F] text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105">
                Open Consultation Assistant
              </button>
            </Link>
          </SignedIn>
        </div>

        {/* Trust Indicators */}
        <div className="text-center text-sm text-[#6B5E55] mt-8">
          <p>HIPAA Compliant • Secure • Professional</p>
        </div>
      </div>
    </main>
  );
}
