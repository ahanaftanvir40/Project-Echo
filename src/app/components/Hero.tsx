import React from 'react'
import RetroGrid from './magicui/retro-grid'
import { motion } from 'framer-motion'
import SparklesText from './magicui/sparkles-text'
import WordPullUp from './magicui/word-pull-up'
function Hero() {
  return (
    <div>
      <div className=" flex min-h-screen  w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-white/80 dark:bg-retro md:shadow-xl">
        <motion.div
          initial={{ opacity: 0 ,y:-75 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay:0.1,
            ease: 'easeOut'

          }}
          className='flex gap-3  items-center'>

          <SparklesText text='Welcome to' sparklesCount={7} className='text-4xl text-black dark:text-white/90 sm:text-8xl font-bold'/>
          <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-4xl sm:text-8xl font-bold leading-none tracking-tighter text-transparent">
            ECHO.
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          className=''
          >
          <WordPullUp words='where vibes sync and the squad is always in the zone.' className='mt-1 sm:mt-4 px-10 sm:px-0 font-semibold tracking-normal text-black/70 dark:text-base  text-neutral-300 max-w-sm sm:max-w-xl mx-auto '/>
        </motion.div>


        <RetroGrid />
      </div>
    </div>
  )
}

export default Hero
