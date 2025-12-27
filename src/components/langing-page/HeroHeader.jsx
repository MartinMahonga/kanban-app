const HeroHeader = () => {
  return (
    <section className="mt-16 mb-24 px-4">
      <div className="flex flex-col max-w-5xl items-center gap-10 mx-auto">
        
        {/* Badge Nouveauté */}
        <a 
          href="/waitlist" 
          className='text-xs md:text-sm font-medium text-white bg-black rounded-full px-4 py-1.5 hover:bg-gray-800 transition-colors'
        >
          Rudix Mobile est arrivé ! Rejoignez la liste d'attente
        </a>

        {/* Section Texte */}
        <div className="space-y-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl text-center font-bold tracking-tight text-gray-900 leading-tight">
            Pilotez vos projets avec une <span className="text-purple-700">clarté absolue.</span>
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto leading-relaxed">
            Centralisez vos tâches, collaborez en temps réel avec votre équipe et 
            visualisez vos progrès. Rudix transforme le chaos en une roadmap structurée 
            pour que vous puissiez vous concentrer sur l'essentiel "livrer".
          </p>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="/register" 
            className='text-white bg-black rounded-lg px-8 py-4 font-semibold hover:scale-105 transition-transform text-center'
          >
            Démarrer gratuitement
          </a>
          <a 
            href="#demo" 
            className='text-black bg-white border border-gray-200 rounded-lg px-8 py-4 font-semibold hover:bg-gray-50 transition-colors text-center'
          >
            Voir la démo
          </a>
        </div>

        {/* Mockup / Image de fond (Placeholder) */}
        <div className="w-full max-w-6xl aspect-video bg-gray-100 border border-gray-200 shadow-2xl rounded-3xl mt-8 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center text-gray-400 italic">
            [ Capture d'écran du Dashboard Rudix ]
          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroHeader;