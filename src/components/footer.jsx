export default function Footer() {
    return(

        <div id="root">
  <footer id="footer" className="bg-neutral-900 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

        <div className="space-y-4">
          <p className="text-neutral-400">Master your typing skills and compete with others worldwide.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-green-400 hover:text-green-300">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.952 10.124 11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.469h-2.796v8.384c5.736-.9 10.124-5.864 10.124-11.853z"/>
              </svg>
            </a>
            <a href="#" className="text-green-400 hover:text-green-300">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
              </svg>
            </a>
            <a href="#" className="text-green-400 hover:text-green-300">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.016 18.6c-.487.225-1.012.39-1.545.48-.534.09-1.08.135-1.626.135-1.035 0-1.96-.162-2.775-.486-.815-.324-1.505-.774-2.07-1.35-.567-.576-.995-1.256-1.284-2.04-.29-.784-.435-1.632-.435-2.544 0-.912.142-1.758.426-2.538.284-.78.696-1.458 1.236-2.034.54-.576 1.188-1.026 1.944-1.35.756-.324 1.608-.486 2.556-.486.948 0 1.806.162 2.574.486.768.324 1.422.774 1.962 1.35.54.576.954 1.254 1.242 2.034.288.78.432 1.626.432 2.538 0 .912-.144 1.764-.432 2.556-.288.792-.702 1.476-1.242 2.052zm2.484-6.84c-.09-.18-.216-.348-.378-.504-.162-.156-.36-.294-.594-.414-.234-.12-.504-.222-.81-.306-.306-.084-.654-.156-1.044-.216l-.378-.054c-.288-.042-.51-.09-.666-.144-.156-.054-.27-.114-.342-.18-.072-.066-.12-.138-.144-.216-.024-.078-.036-.168-.036-.27 0-.204.072-.378.216-.522.144-.144.366-.216.666-.216.264 0 .456.054.576.162.12.108.204.27.252.486l1.944-.234c-.096-.444-.252-.81-.468-1.098-.216-.288-.474-.51-.774-.666-.3-.156-.624-.264-.972-.324-.348-.06-.69-.09-1.026-.09-.408 0-.81.048-1.206.144-.396.096-.75.246-1.062.45-.312.204-.564.468-.756.792-.192.324-.288.714-.288 1.17 0 .348.054.654.162.918.108.264.27.492.486.684.216.192.48.354.792.486.312.132.672.24 1.08.324l.396.054c.336.048.594.102.774.162.18.06.312.126.396.198.084.072.132.15.144.234.012.084.018.174.018.27 0 .24-.084.426-.252.558-.168.132-.408.198-.72.198-.384 0-.654-.078-.81-.234-.156-.156-.252-.39-.288-.702l-1.944.162c.048.456.156.846.324 1.17.168.324.39.588.666.792.276.204.6.354.972.45.372.096.792.144 1.26.144.432 0 .852-.048 1.26-.144.408-.096.774-.252 1.098-.468.324-.216.582-.498.774-.846.192-.348.288-.774.288-1.278 0-.36-.06-.678-.18-.954z"/>
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#typingArena" className="text-neutral-400 hover:text-green-400 transition-colors duration-200">Typing Arena</a></li>
            <li><a href="#leaderboard" className="text-neutral-400 hover:text-green-400 transition-colors duration-200">Leaderboard</a></li>
            <li><a href="#multiplayer" className="text-neutral-400 hover:text-green-400 transition-colors duration-200">Multiplayer</a></li>
            <li><a href="#practice" className="text-neutral-400 hover:text-green-400 transition-colors duration-200">Practice</a></li>
            <li><a href="#statistics" className="text-neutral-400 hover:text-green-400 transition-colors duration-200">Statistics</a></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-neutral-400 hover:text-green-400 transition-colors duration-200">Help Center</a></li>
            <li><a href="#" className="text-neutral-400 hover:text-green-400 transition-colors duration-200">FAQs</a></li>
            <li><a href="#" className="text-neutral-400 hover:text-green-400 transition-colors duration-200">Contact Us</a></li>
            <li><a href="#" className="text-neutral-400 hover:text-green-400 transition-colors duration-200">Privacy Policy</a></li>
            <li><a href="#" className="text-neutral-400 hover:text-green-400 transition-colors duration-200">Terms of Service</a></li>
          </ul>
        </div>

   
        <div>
          <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
          <p className="text-neutral-400 mb-4">Subscribe to our newsletter for tips and updates.</p>
          <form className="space-y-4">
          <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-300 focus:outline-none focus:border-green-400"/>
            <button type="submit" className="w-full px-4 py-2 bg-green-500 text-neutral-900 rounded-lg font-medium hover:bg-green-400 transition-colors duration-200">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      
      <div className="pt-8 border-t border-neutral-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-neutral-500 text-sm mb-4 md:mb-0">
            © 2024 TyperX. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-neutral-500 hover:text-green-400 text-sm">Privacy Policy</a>
            <a href="#" className="text-neutral-500 hover:text-green-400 text-sm">Terms of Service</a>
            <a href="#" className="text-neutral-500 hover:text-green-400 text-sm">Cookies Policy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>
    )
}


