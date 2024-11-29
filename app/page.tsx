"use client"
import { useState, useEffect, MouseEvent } from 'react'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { generatePalette, generateRandomColor } from '@/lib/utils'

export default function ColorPaletteGenerator() {
  const [colorsNumber, setColorsNumber] = useState(5)
  const [savedPalettes, setSavedPalettes] = useState<{color:string, locked: boolean}[][]>([]);
  const [palette, setPalette] = useState<{color:string, locked: boolean}[]>([])
  const { toast } = useToast()

  useEffect(()=>{
    if(localStorage.getItem("savedPalettes")){
      setSavedPalettes([...JSON.parse(localStorage.getItem("savedPalettes") as string)]);
    }

    const colors = generatePalette(colorsNumber);
    setPalette(colors.map(color =>{
      return {
        color,
        locked: false
      }
    }))
  }, [colorsNumber]);
  
  const handleAddColor = () => {
    if(colorsNumber < 5){
      setColorsNumber(colorsNumber + 1)
    }
  }

  const handleRemoveColor = () => {
    if(colorsNumber > 3){
      setColorsNumber(colorsNumber - 1)
    }
  }

  const handleGeneratePalette = () => {
    const colors = palette.map(p => {
      return {color: p.locked ? p.color : generateRandomColor(), locked: p.locked};
    })
    setPalette(colors)
  }

  const handleSavePalette = () => {
    console.log(savedPalettes.indexOf(palette));
    if(savedPalettes.indexOf(palette) === -1){
      setSavedPalettes([...savedPalettes, palette]);
      localStorage.setItem("savedPalettes", JSON.stringify([...savedPalettes, palette]));
      toast({
        title: "Palette sauvegardée !",
        description: "La palette a été sauvegardée avec succès.",
      });
    }else{
      toast({
        title: "Cette palette est déjà sauvegardée !",
        description: "Vous avez déjà sauvegardé cette palette.",
      });
    }
  }

  const handleLockColor = (event: MouseEvent , index: number) => {
    event.stopPropagation()
    const colors = palette.map((p, i) => {
      if (i === index) {
        return {
          ...p,
          locked: !p.locked
        }
      }
      return p
    })
    setPalette(colors)
  }

  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color)
    toast({
      title: "Couleur copiée !",
      description: `Le code ${color} a été copié dans le presse-papiers.`,
    })
  }

  const handleSelectSavedPalette = (index: number) => {
    setPalette(savedPalettes[index]);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 lg:px-8 flex justify-center items-center">
      <div className="w-full h-full mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 font-medium">Parce que la conception d&apos;<em style={{background: palette[1]?.color, color: "#FFF", fontWeight: 600}}>une App qui claque</em> commence par le choix des <em style={{background: palette[3]?.color ? palette[3]?.color : palette[2]?.color, color: "#FFF", fontWeight: 600}}>bonnes couleurs</em>.</h1>
        <div className="flex items-center gap-2">
          <p>Nombre de couleur:</p>
          <div className="flex items-center gap-2">
            <button onClick={handleRemoveColor} className='px-3 py-1 bg-slate-500 text-white'>-</button>
            {colorsNumber}
            <button onClick={handleAddColor} className='px-3 py-1 bg-slate-500 text-white'>+</button>
          </div>
        </div>
        <div className="h-full grid grid-cols-5 gap-0 my-8 rounded-lg">
          {palette.map((p, index) => (
            <div 
              key={index} 
              className="h-64 relative shadow-lg cursor-pointer transition-transform hover:scale-105"
              style={{ backgroundColor: p.color }}
              onClick={() => handleCopyColor(p.color)}
            >
              <div onClick={e => handleLockColor(e, index)} className="absolute z-5 flex items-center justify-start">
                <span className="text-white text-2xl font-bold">{p.locked ? "🔒" : "🔓"}</span>
              </div>
              <div className="h-full flex items-end justify-center p-2">
                <span className="text-xs font-mono bg-white bg-opacity-80 rounded px-2 py-1">
                  {p.color}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center gap-2">
          <button className='px-3 py-1 bg-slate-500 text-white rounded' onClick={handleGeneratePalette}>Générer une nouvelle palette</button>
          <button className='px-3 py-1 bg-slate-500 text-white rounded' onClick={handleSavePalette}>Sauvegarder la palette</button>
        </div>
        <div className="bg-slate-200 rounded p-2 mt-10 overflow-x-scroll">
          <h2 className="font-bold">Palettes sauvegardées</h2>
          <div className="flex gap-5 mt-2">
            {savedPalettes.map((p, index) => (
              <div onClick={()=>handleSelectSavedPalette(index)} key={index} className=" min-h-10 flex">
                {p.map((color, index) => (
                  <div 
                    key={index} 
                    className="h-10 w-2 relative shadow-lg cursor-pointer transition-transform"
                    style={{ backgroundColor: color.color }}
                  >
                    <div className="h-full flex items-end justify-center p-2">
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

