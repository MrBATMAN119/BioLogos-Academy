import React from 'react';
import { ExternalLink, Book, Heart } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <span className="font-serif font-bold text-xl text-blue-900">Mr Batman Ministry</span>
              <div className="hidden md:flex gap-6">
                <a href="#chet" className="text-sm hover:text-blue-900 transition-colors">CHET</a>
                <a href="#biologos" className="text-sm hover:text-blue-900 transition-colors">BioLogos Academy</a>
                <a href="#help" className="text-sm hover:text-blue-900 transition-colors">Help Center</a>
                <a href="#deepdive" className="text-sm hover:text-blue-900 transition-colors">Deep Dive</a>
                <a href="#support" className="text-sm hover:text-blue-900 transition-colors">Support</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <img 
            src="https://mrbatman.abacusai.app/batlogonew%20sqr%20(1).png" 
            alt="Mr Batman Ministry Logo" 
            className="w-48 h-48 mx-auto rounded-lg shadow-xl"
          />
          <div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-blue-900 mb-4">Servant and Teacher</h1>
            <h2 className="text-2xl md:text-3xl text-gray-700 font-light mb-6">Messianic Torah Observant Ministry</h2>
          </div>
          <a href="https://www.youtube.com/watch?v=qBaEsynhKf8" target="_blank" rel="noopener noreferrer" className="inline-block">
            <img 
              src="https://mrbatman.abacusai.app/learn-about-mrb.png" 
              alt="Learn About Mr. Batman - Click Here" 
              className="max-w-md w-full mx-auto rounded-lg shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
            />
          </a>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 text-left max-w-2xl mx-auto">
            <p className="text-lg leading-relaxed mb-4">
              Called to proclaim the Word of the Almighty and teach His Torah. Bridging ancient Hebrew wisdom with modern understanding, revealing how God's creation declares His glory through every discovery.
            </p>
            <h3 className="text-xl font-bold text-blue-900 mb-3">God's Way to Blessing</h3>
            <p className="mb-2">If you want blessing, the Bible makes it clear:</p>
            <p className="mb-2">If you want to be blessed do what God says and do it the way He says</p>
            <p className="mb-4">You want to be TRULY blessed? Do it on the DAY He says. - The Sabbath</p>
            <blockquote className="border-l-4 border-blue-900 pl-4 italic text-gray-700">
              "Hear, O Israel: The LORD our God, the LORD is one."<br />
              <span className="text-sm">Deuteronomy 6:4 (Shema)</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CHET Section */}
      <section id="chet" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">C.H.E.T.</h2>
          <h3 className="text-2xl text-gray-700 mb-6">Covenant Holiness Evaluation Tool</h3>
          <p className="text-lg mb-6 leading-relaxed">
            AI-powered Biblical Dictionary with Hebrew/Greek term analysis, historical context, and scholarly insights to enhance your understanding of God's Word.
            Perfect for pastors, students, researchers, and anyone seeking deeper biblical understanding.
          </p>
          <blockquote className="bg-white border-l-4 border-amber-500 p-6 mb-8 italic">
            "Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth."<br />
            <span className="text-sm">2 Timothy 2:15</span>
          </blockquote>
          <a href="https://chatgpt.com/g/g-680c34cabdb4819185c406da60c4ae01-c-h-e-t-covenant-holiness-evaluation-tool" target="_blank" rel="noopener noreferrer" className="inline-block">
            <img 
              src="https://mrbatman.abacusai.app/chet-no-bg.png" 
              alt="CHET - Covenant Holiness Evaluation Tool" 
              className="max-w-md w-full rounded-lg shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
            />
          </a>
        </div>
      </section>

      {/* BioLogos Academy Section */}
      <section id="biologos" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">BioLogos Academy</h2>
          <h3 className="text-2xl text-gray-700 mb-6">Faith and Science in Harmony</h3>
          <p className="text-lg mb-6 leading-relaxed">
            Explore the intersection of faith and science through comprehensive courses that demonstrate how God's creation reveals His glory. Discover how modern scientific understanding can deepen rather than diminish our faith in the Creator.
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <Book className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
              <span>Evidence-based approach to faith and science integration</span>
            </li>
            <li className="flex items-start gap-3">
              <Book className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
              <span>Torah-centered perspective on God's creation</span>
            </li>
            <li className="flex items-start gap-3">
              <Book className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
              <span>Interactive courses and educational resources</span>
            </li>
          </ul>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="text-xl font-bold text-blue-900 mb-3">Biblical Dictionary Protocol</h4>
            <p>Our comprehensive approach to Bible study includes detailed analysis, commentary, and practical application</p>
          </div>
        </div>
      </section>

      {/* Help Center Section */}
      <section id="help" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">Mr Batman's Help and Resource Center</h2>
          <p className="text-lg mb-6 leading-relaxed">
            Helping people with their needs - fellowship, food, jobs, or transportation. We're here to help.
          </p>
          <a 
            href="https://help.mrbatman.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors mb-8"
          >
            Access Help Center <ExternalLink className="w-4 h-4" />
          </a>
          <blockquote className="bg-white border-l-4 border-amber-500 p-6 mb-8 italic">
            "This is my attempt to help those in need, no matter what their age or their family status or their religious belief. I'm just here to help."<br />
            <span className="text-sm font-bold">Jim - Mr Batman</span>
          </blockquote>
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Weekly Gatherings</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
              <span>Biblical discussions and wisdom</span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
              <span>Fellowship and community</span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
              <span>Prayer and encouragement</span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
              <span>Life insights and growth</span>
            </li>
          </ul>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <img 
              src="https://cdn.abacus.ai/images/b36e3d91-b866-4875-939c-7f0f1bc4a9d7.png" 
              alt="QR Code - Scan to Visit" 
              className="w-48 h-48"
            />
            <div>
              <p className="text-sm font-bold mb-2">Scan to Visit</p>
              <p className="text-blue-900 font-mono">senior.mrbatman.com</p>
            </div>
          </div>
          <blockquote className="bg-white border-l-4 border-amber-500 p-6 mt-8 italic">
            "And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another."<br />
            <span className="text-sm">Hebrews 10:24-25</span>
          </blockquote>
        </div>
      </section>

      {/* In the Beginning Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">In the Beginning</h2>
          <h3 className="text-2xl text-gray-700 mb-6">God's Masterpiece of Creation</h3>
          <p className="text-lg mb-6 leading-relaxed">
            <span className="font-bold text-blue-900">"Bereshit bara Elohim et hashamayim ve'et ha'aretz"</span> - In the beginning, God created the heavens and the earth. This foundational truth from Genesis 1:1 reveals the divine origin of all existence.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="text-xl font-bold text-blue-900 mb-3">Divine Design</h4>
              <p>Every aspect of creation reflects God's infinite wisdom and perfect design.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="text-xl font-bold text-blue-900 mb-3">Cosmic Order</h4>
              <p>The heavens declare His glory, from galaxies to quantum particles.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="text-xl font-bold text-blue-900 mb-3">Living Purpose</h4>
              <p>All creation exists to glorify the Creator and reveal His nature.</p>
            </div>
          </div>
          <blockquote className="bg-amber-50 border-l-4 border-amber-500 p-6 italic">
            "In the beginning God created the heavens and the earth."<br />
            <span className="text-sm">Genesis 1:1 (Bereshit)</span>
          </blockquote>
        </div>
      </section>

      {/* Deep Dive Scripture Section */}
      <section id="deepdive" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">Deep Dive Scripture</h2>
          <h3 className="text-2xl text-gray-700 mb-6">Exploring the Depths of God's Word</h3>
          <p className="text-lg mb-8 leading-relaxed">
            Immerse yourself in comprehensive biblical study that goes beyond surface reading. Our Deep Dive Scripture approach reveals the rich layers of meaning within God's Word, connecting ancient Hebrew wisdom with modern understanding.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-bold text-blue-900 mb-3">Exegetical Study</h4>
              <p>Detailed analysis of original Hebrew and Greek texts to uncover deeper meanings.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-bold text-blue-900 mb-3">Practical Application</h4>
              <p>Connecting ancient wisdom to modern life through Torah-centered living.</p>
            </div>
          </div>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <Book className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
              <span>Verse-by-verse commentary and analysis</span>
            </li>
            <li className="flex items-start gap-3">
              <Book className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
              <span>Historical and cultural context exploration</span>
            </li>
            <li className="flex items-start gap-3">
              <Book className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
              <span>Prophetic insights and spiritual revelation</span>
            </li>
            <li className="flex items-start gap-3">
              <Book className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
              <span>Cross-references and thematic connections</span>
            </li>
          </ul>
          <blockquote className="bg-white border-l-4 border-amber-500 p-6 italic">
            "Study to show yourself approved unto God, a workman that needs not to be ashamed, rightly dividing the word of truth."<br />
            <span className="text-sm">2 Timothy 2:15</span>
          </blockquote>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">Support This Ministry</h2>
          <p className="text-xl mb-4">Your prayers and your financial support are greatly appreciated</p>
          <p className="text-lg mb-8 leading-relaxed">
            Help us continue spreading Torah wisdom, biblical truth, and prophetic insights to believers around the world. Your support helps fund both our ministry outreach and the ongoing development of the Biblical Dictionary Project.
          </p>
          <div className="flex flex-col items-center gap-6 mb-8">
            <img 
              src="https://mrbatman.abacusai.app/bmc-qr-code.png" 
              alt="Buy Me A Coffee QR Code - Support Ministry & Bible Dictionary Project" 
              className="w-48 h-48"
            />
            <a 
              href="https://buymeacoffee.com/pastorjim" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amber-500 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-amber-600 transition-colors shadow-lg"
            >
              <Heart className="w-5 h-5" />
              Support Ministry & Bible Dictionary Project
            </a>
          </div>
          <div className="text-left max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Ways to Support</h3>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                <span>Financial donations help fund our educational resources and outreach</span>
              </li>
              <li className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                <span>Share our content and ministry with family and friends</span>
              </li>
              <li className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                <span>Pray for our ministry and the people we reach</span>
              </li>
              <li className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                <span>Use and recommend our biblical resources and tools</span>
              </li>
            </ul>
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h4 className="text-xl font-bold text-blue-900 mb-3">Ministry Impact</h4>
              <p className="leading-relaxed">
                Your support enables us to create biblical resources, provide Torah education, offer prophetic guidance, develop the Biblical Dictionary Project, and build community among believers seeking deeper understanding of God's Word and His ways.
              </p>
            </div>
          </div>
          <blockquote className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-6 italic">
            "Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver."<br />
            <span className="text-sm">2 Corinthians 9:7</span>
          </blockquote>
          <p className="text-lg text-gray-700">
            Thank you for your heart to support God's work through this ministry. May the Lord bless you abundantly for your generosity and faithfulness.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="mb-2">© 2024 Mr Batman Ministry - Messianic Torah Observant Ministry</p>
          <p className="text-sm text-blue-200">Proclaiming the Word of the Almighty and teaching His Torah</p>
        </div>
      </footer>
    </div>
  );
};

export default App;