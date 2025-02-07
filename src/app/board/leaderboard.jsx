"use client"

function Leaderboard(){
    return(
        <div>
            <div id="root">
  <section id="leaderboard" className="bg-neutral-800 py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 animate__animated animate__fadeIn">
        <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">Global Leaderboard</h2>
        <p className="text-neutral-400">Compete with the fastest typists worldwide</p>
      </div>


      <div className="bg-neutral-900 rounded-lg p-4 mb-8 animate__animated animate__fadeInUp">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div className="flex space-x-4">
            <select className="bg-neutral-800 text-green-400 rounded-lg px-4 py-2 border border-neutral-700 focus:outline-none focus:border-green-400">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="allTime">All Time</option>
            </select>
            <select className="bg-neutral-800 text-green-400 rounded-lg px-4 py-2 border border-neutral-700 focus:outline-none focus:border-green-400">
              <option value="global">Global</option>
              <option value="regional">Regional</option>
              <option value="friends">Friends</option>
            </select>
          </div>
          <div className="relative">
            <input type="search" placeholder="Search players..." className="bg-neutral-800 text-green-400 rounded-lg pl-10 pr-4 py-2 border border-neutral-700 focus:outline-none focus:border-green-400"/>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

  
      <div className="bg-neutral-900 rounded-xl shadow-lg overflow-hidden animate__animated animate__fadeInUp">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-800">
              <th className="px-6 py-4 text-left text-sm font-semibold text-green-400">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-green-400">Player</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-green-400">WPM</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-green-400">Accuracy</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-green-400">Tests</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-green-400">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
      
            <tr className="bg-green-400/5">
              <td className="px-6 py-4"><span className="text-yellow-400 font-bold">#1</span></td>
              <td className="px-6 py-4 flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-neutral-900 font-bold">S</div>
                <span className="text-white">SpeedMaster</span>
                <span className="bg-green-400/20 text-green-400 px-2 py-1 rounded-full text-xs">Pro</span>
              </td>
              <td className="px-6 py-4 text-green-400">156</td>
              <td className="px-6 py-4 text-green-400">99.8%</td>
              <td className="px-6 py-4 text-neutral-400">1,234</td>
              <td className="px-6 py-4 text-green-400">10,500</td>
            </tr>
            <tr className="bg-neutral-800/5">
              <td className="px-6 py-4"><span className="text-gray-300 font-bold">#2</span></td>
              <td className="px-6 py-4 flex items-center space-x-3">
                <div className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center text-white font-bold">T</div>
                <span className="text-white">TypeNinja</span>
              </td>
              <td className="px-6 py-4 text-green-400">152</td>
              <td className="px-6 py-4 text-green-400">99.5%</td>
              <td className="px-6 py-4 text-neutral-400">956</td>
              <td className="px-6 py-4 text-green-400">9,800</td>
            </tr>
            <tr className="bg-yellow-900/5">
              <td className="px-6 py-4"><span className="text-yellow-700 font-bold">#3</span></td>
              <td className="px-6 py-4 flex items-center space-x-3">
                <div className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center text-white font-bold">K</div>
                <span className="text-white">KeyWarrior</span>
              </td>
              <td className="px-6 py-4 text-green-400">149</td>
              <td className="px-6 py-4 text-green-400">99.2%</td>
              <td className="px-6 py-4 text-neutral-400">878</td>
              <td className="px-6 py-4 text-green-400">9,200</td>
            </tr>

     
            <tr className="hover:bg-neutral-800/50 transition-colors duration-200">
              <td className="px-6 py-4 text-neutral-400">#4</td>
              <td className="px-6 py-4 flex items-center space-x-3">
                <div className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center text-white font-bold">R</div>
                <span className="text-white">RapidKeys</span>
              </td>
              <td className="px-6 py-4 text-green-400">145</td>
              <td className="px-6 py-4 text-green-400">98.9%</td>
              <td className="px-6 py-4 text-neutral-400">756</td>
              <td className="px-6 py-4 text-green-400">8,900</td>
            </tr>
          </tbody>
        </table>

 
        <div className="bg-neutral-800 px-6 py-4 flex justify-between items-center">
          <button className="px-4 py-2 text-green-400 hover:bg-neutral-700 rounded-lg transition-colors duration-200">Previous</button>
          <div className="flex space-x-2">
            <button className="w-8 h-8 flex items-center justify-center bg-green-400 text-neutral-900 rounded">1</button>
            <button className="w-8 h-8 flex items-center justify-center text-green-400 hover:bg-neutral-700 rounded">2</button>
            <button className="w-8 h-8 flex items-center justify-center text-green-400 hover:bg-neutral-700 rounded">3</button>
            <span className="w-8 h-8 flex items-center justify-center text-neutral-400">...</span>
            <button className="w-8 h-8 flex items-center justify-center text-green-400 hover:bg-neutral-700 rounded">10</button>
          </div>
          <button className="px-4 py-2 text-green-400 hover:bg-neutral-700 rounded-lg transition-colors duration-200">Next</button>
        </div>
      </div>
    </div>
  </section>
</div>
        </div>
    )
}

export default Leaderboard;