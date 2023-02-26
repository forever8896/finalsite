
import { useState, useEffect } from 'react';
import axios from "axios";

import Head from 'next/head';
import Image from 'next/image';
import focLogo from '../assets/foc-logo.png';

const Home = () => {

  const maxRetries = 20;
  // const [input, setInput] = useState("");
  const [img, setImg] = useState('');

  const [retry, setRetry] = useState(0);

  const [retryCount, setRetryCount] = useState(maxRetries);

  const [isGenerating, setIsGenerating] = useState(false);

  const [finalPrompt, setFinalPrompt] = useState('');


  const [artist, setArtist] = useState("");
  const [medium, setMedium] = useState("");
  const [vibe, setVibe] = useState("");
  const [descriptors, setDescriptors] = useState("");
  const [foc, setFocPercentage] = useState(0);

  const onArtistChange = (event) => {
    setArtist(event.target.value);
  };

  const onMediumChange = (event) => {
    setMedium(event.target.value);
  };

  const onVibeChange = (event) => {
    setVibe(event.target.value);
  };

  const onDescriptorsChange = (event) => {
    setDescriptors(event.target.value);
  };
  const setFoc25 = () => {
    if (foc === 25) {
      setFocPercentage(0);
    } else {
    setFocPercentage(25);
  }
  };

  const setFoc50 = () => {
    if (foc === 50) {
      setFocPercentage(0);
    } else {
    setFocPercentage(50);
  }
  };

  const setFoc100 = () => {
    if (foc === 100) {
      setFocPercentage(0);
    } else {
    setFocPercentage(100);
  }
  };

   const onChange = (event) => {
    setInput(event.target.value);
  };



    const handleUpscale = async () => {
    const replicateApiUrl = 'https://api.replicate.com/v1/predictions';
    try {
      const response = await axios.post(replicateApiUrl, {
        version: "30c1d0b916a6f8efce20493f5d61ee27491ab2a60437c13c588468b9810ec23f",
        input: {
          image: img,
        },
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${replicateApiToken}`,
        },
      });
  
      const upscaledImageUrl = response.data.output.image;
      setImg(upscaledImageUrl);
    } catch (error) {
      console.error('Error upscaling image:', error);
    }
  };
  

  const generateAction = async () => {
    console.log('Generating...');

    if (isGenerating && retry === 0) return;

    setIsGenerating(true);

    // If this is a retry request, take away retryCount
    if (retry > 0) {
      setRetryCount((prevState) => {
        if (prevState === 0) {
          return 0;
        } else {
          return prevState - 1;
        }
      });

      setRetry(0);
    }

    let focText = () => {
      if (foc === 25) {
        return "with a hint of colors and texture of an focplanet"
      } else if (foc === 50) {
        return "With a focplanet in the background, with small transparency, overlooking the image"
      } else if (foc === 100) {
        return "in the style, colors, and feeling of an FoC planet, in the style of an focplanet"
      } else if (foc === 0) {
        return "high-definition"
      }
    }

    let prompt = `Art in the style of ${artist},using the medium of ${medium}, in the vibe of ${vibe}, depicting ${descriptors}, ${focText}`;

    setFinalPrompt(`Art in the style of ${artist},using the medium of ${medium}, in the vibe of ${vibe}, depicting ${descriptors},`)
    prompt.replace("planet", "focplanet");
    prompt.replace("planets", "focplanet")


    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg',
      },
      body: JSON.stringify({ input: prompt }),
    });

    const data = await response.json();

    if (response.status === 503) {
      // Set the estimated_time property in state
      setRetry(data.estimated_time);
      return;
    }

    if (!response.ok) {
      console.log(`Error: ${data.error}`);

      setIsGenerating(false);
      return;
    }

    // setInput('');
    setImg(data.image);
    setIsGenerating(false);
  };

  const sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

 

  useEffect(() => {
    const runRetry = async () => {
      if (retryCount === 0) {
        console.log(`Model still loading after ${maxRetries} retries. Try request again in 5 minutes.`);
        setRetryCount(maxRetries);
        return;
        }

      console.log(`Trying again in ${retry} seconds.`);

      await sleep(retry * 1000);

      await generateAction();
    };

    if (retry === 0) {
      return;
    }

    runRetry();
  }, [retry]);
  return (
    <div className="root">
      <Head>
        <title>FoC Art Generator</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Create FoC-themed A.I art and beyond</h1>
          </div>
          <div className="header-subtitle">
            <h2>Public access for now, moving to holders-only soon...</h2>
          </div>
          <div className="prompt-container">
          <input className="prompt-box" value={artist} onChange={onArtistChange} placeholder="Artist" />
  <input className="prompt-box" value={medium} onChange={onMediumChange} placeholder="Medium" />
  <input className="prompt-box" value={vibe} onChange={onVibeChange} placeholder="Vibe" />
  <input className="prompt-box" value={descriptors} onChange={onDescriptorsChange} placeholder="Descriptors" />
  
        <div className='prompt-buttons'>
        <button className={ foc === 25 ? 'foc-button foc-active' : "foc-button"} onClick={setFoc25}>1/4 FoC🪐</button>
  <button className={ foc === 50 ? 'foc-button foc-active' : "foc-button"} onClick={setFoc50}>1/2 FoC🪐</button>
  <button className={ foc === 100 ? 'foc-button foc-active' : "foc-button"} onClick={setFoc100}>💯FoC🪐</button>
          <a className={isGenerating ? "generate-button loading" : 'generate-button'}
           onClick={generateAction}>
            <div className='generate'>
              {isGenerating ? (
                <span className='loader'></span>
              ) : (<p>generate</p>)}
              
            </div>
          </a>
        </div>
      </div>
        </div>
        {img && (
          <div className='output-content'>
            <Image src={img} width={512} height={512} alt={finalPrompt} />
            <p>{finalPrompt}</p>
            {/* <button onClick={handleUpscale}>Upscale</button> */}
          </div>
        )}
      </div>
      <div className="badge-container grow">
        <a
          href="https://twitter.com/FutureOfColour"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={focLogo} alt="foc logo" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
