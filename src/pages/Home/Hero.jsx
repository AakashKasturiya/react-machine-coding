export const Hero = () =>{
    return(
        <>
         <header className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background-100/60 to-background-50"></div>
            <div className="relative max-w-[1400px] mx-auto px-4 md:px-6">
               <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                  <div className="flex-1 w-full text-center lg:text-left">
                     <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-100 text-accent-700 text-xs font-semibold rounded-full mb-6"><i className="ri-sparkling-2-line"></i><span>2000+ developers leveled up</span></div>
                     <h1 className="font-heading font-extrabold text-3xl md:text-5xl lg:text-6xl text-foreground-950 leading-[1.08] mb-5">Master Machine Coding.<br></br><span className="text-primary-500">Ace Your Interviews.</span></h1>
                     <p className="text-foreground-600 text-sm md:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8">A curated collection of frontend machine coding challenges sourced from real interviews at top tech companies. Live demos, complete source code, and progressive difficulty to level up your React skills.</p>
                     <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start"><a href="#projects" className="w-full sm:w-auto px-7 py-3 bg-primary-500 text-white text-sm font-semibold rounded-full hover:bg-primary-600 transition-all cursor-pointer whitespace-nowrap text-center shadow-[0_0_30px_rgba(251,191,36,0.3)]">Browse Projects <i className="ri-arrow-right-line ml-1.5"></i></a><a href="#" className="w-full sm:w-auto px-7 py-3 bg-background-200 text-foreground-700 text-sm font-semibold rounded-full hover:bg-background-300 transition-colors cursor-pointer whitespace-nowrap text-center" rel="nofollow"><i className="ri-github-fill mr-1.5"></i> View on GitHub</a></div>
                  </div>
                  <div className="flex-1 w-full">
                   <div className="relative w-full h-[300px] md:h-[420px] rounded-2xl overflow-hidden">
                     <img alt="Machine coding projects workspace" title="Machine Coding Projects — ReactJS &amp; Frontend Practice" className="w-full h-full object-cover object-top rounded-2xl" src="https://readdy.ai/api/search-image?query=Modern%20developer%20workspace%20with%20laptop%20showing%20React%20code%20editor%20interface%20on%20screen%2C%20warm%20ambient%20lighting%2C%20minimal%20desk%20setup%20with%20coffee%20cup%2C%20clean%20aesthetic%2C%20soft%20neutral%20background%2C%20editorial%20tech%20photography%20with%20cinematic%20depth%20of%20field&amp;width=1200&amp;height=840&amp;seq=hero-main-visual&amp;orientation=landscape" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent rounded-2xl"></div>
                   </div>
                  </div>
               </div>
            </div>
         </header>

        </>
    )
}