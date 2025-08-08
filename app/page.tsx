import { generateObject, generateText } from "ai"
import { google } from "@ai-sdk/google"
import { z } from "zod"

export default async function Home() {
  const text = await generateText({
    model: google("models/gemini-2.0-flash-exp"),
    prompt: "Give me a short one sentance summary of the book Hamlet"
  })

  const output = await generateObject({
    model: google("models/gemini-2.0-flash-exp"),
    prompt: "Give me 5 character names from Hamlet and a 5-word summary of each.",
    schema: z.object({
      characters: z.array(
        z.object({
          name: z.string(),
          description: z.string(),
        })
      )
    })
  })
    
  return (
    <div className="flex flex-col justify-center gap-4 h-[100dvh] w-[800px] mx-auto">
      <h1 className="text-3xl font-bold">Hamlet</h1>
      <img className="w-full h-[200px] object-cover object-[50%_20%] rounded-4xl" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Hamlet_William_Morris_Hunt.jpeg/640px-Hamlet_William_Morris_Hunt.jpeg" alt="Hamlet" />
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="font-semibold">Summary</h1>
          <p className="text-[#5c5c5c]">{text.text}</p>
        </div>
        <div>
          <h1 className="font-semibold">Characters</h1>
          {output.object.characters.map((o, i) => (
            <div key={i} className="border-b border-gray-200 py-4 w-fit">
              <span className="font-semibold">{o.name}</span> - {o.description}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}