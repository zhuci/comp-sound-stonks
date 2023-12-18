import React from "react";
// import ReactMarkdown from "react-markdown";
import NavBar from "../components/NavBar";
import Typography from "@mui/material/Typography";
import { COLORS } from "../values/colors";

const Blog = () => {
  return (
    <div className="flex flex-col m-8 space-y-4">
      <NavBar />
      <div className="pt-10 mx-60">
        <Typography variant="h3" style={{ color: COLORS.red }}>
          Blog Post :){" "}
        </Typography>{" "}
        <br />
        <Typography
          variant="h4"
          component="h1"
          style={{ color: COLORS.orange }}
        >
          Why Stonks?
        </Typography>
        <Typography paragraph>
          From the examples in class, we felt like one avenue of automated
          composition is building upon interesting data streams (such as the
          Game of Life). Thinking about data streams, we thought most
          immediately about the stock market — its large dataset gives us
          latitude to compare and derive a large range of sounds, and its many
          features (such as price(s), volume, volatility, etc.) can be converted
          into a multitude of musical qualities.
        </Typography>
        <Typography
          variant="h4"
          component="h1"
          style={{ color: COLORS.orange }}
        >
          Implementation
        </Typography>
        <Typography paragraph>
          {/* <Typography component="div"> */}
          Broadly, our workflow was as follows: <br />
          1. scrape stock data (using Python) <br /> 2. read user settings to
          process data (JavaScript) <br />
          3. generate audio and visualizations from the processed data (React
          and JavaScript)
        </Typography>
        {/* Subheadings can be h5 or h6 depending on the visual importance */}
        <Typography variant="h5" component="h2" style={{ color: COLORS.blue }}>
          Data
        </Typography>
        {/* Content for Data section */}
        <Typography paragraph>
          Using the AlphaVantage API, we grabbed 20 years of data for the
          S&P500, at 15 minute granularity. With Pandas, we organized the data
          (since it needed to be collated from several API queries) and
          outputted it into 20 .json files, one for each year.
        </Typography>
        <Typography variant="h5" component="h2" style={{ color: COLORS.blue }}>
          Settings & Data Processing
        </Typography>
        <Typography paragraph>
          Whenever the user changes the settings, React hooks make sure that
          those new settings are used to grab the right data (from the correct
          date range), and processed as necessary (filtering for speed, turning
          raw data into frequencies, volumes, and partials), then finally fed
          into the audio and visual components. Read more about our design
          choices about these processes below.
        </Typography>
        <Typography variant="h5" component="h2" style={{ color: COLORS.blue }}>
          Audio & Visualization
        </Typography>
        <Typography variant="h6" component="h2" style={{ color: COLORS.green }}>
          Notes
        </Typography>
        <Typography paragraph>
          The closing stock price data was used to produce the frequency for
          each note. See the design choices section about details here.
        </Typography>
        <Typography variant="h6" component="h2" style={{ color: COLORS.green }}>
          Volume
        </Typography>
        <Typography paragraph>
          For the given range, we normalized the trading volume to between 0.1
          and 0.9, and set the gain of that note to be that volume.
        </Typography>
        <Typography variant="h6" component="h2" style={{ color: COLORS.green }}>
          Additive Synthesis
        </Typography>
        <Typography paragraph>
          As a measure of how much stock prices changed, we took the difference
          between the high and low price, normalized the difference (to between
          0 and 8), and used that number as the number of partials for Additive
          Synthesis. The increasing complexity of the sound thus mirrors the
          volatility of the market.
        </Typography>
        <Typography variant="h6" component="h2" style={{ color: COLORS.green }}>
          Charting
        </Typography>
        <Typography paragraph>
          Using the library Rechart, we made sure that both the line of the
          original stock data and sampled notes were visible, along with a
          tooltip to display the letter name of the note that was playing. Also,
          as the sound plays, the chart moves a vertical line to show which note
          we are on.
        </Typography>
        {/* Design Choices */}
        <Typography
          variant="h4"
          component="h1"
          style={{ color: COLORS.orange }}
        >
          Design Choices
        </Typography>
        <Typography paragraph>
          Most of our more difficult design choices were with how we took the
          huge load of data and preprocessed it so that we could work with it
          more easily.
        </Typography>
        <Typography variant="h5" component="h2" style={{ color: COLORS.blue }}>
          Data & Its Filtering
        </Typography>
        <Typography paragraph>
          Firstly, why did we want to work with so much stock data in the first
          place? We believe that at the core of this project was the exploration
          of how very different data, plugged into our audiovisual
          transformations, would turn out. That's why we wanted all 20 years of
          SPY data, so we could explore changes across large periods of time,
          and how things looked/sounded decades ago. That's also why we wanted
          data at the small granularity of 15 minutes, so we can also take a
          look at how things might turn out within even just one day.
        </Typography>
        <Typography paragraph>
          Secondly, why did we use a bunch of local .json files? Honestly, this
          was just the easiest and fastest way to get our project up and
          running, since we didn't have much experience with setting up a
          database and didn't want that to get in the way of our first MVP.
        </Typography>
        <Typography paragraph>
          Lastly is how we filtered the large amounts of data, since producing
          sound and visualizations of a lot of data would never work (it'd lag
          forever :') ). We decided to allow the user to control some of this
          with the Number of Notes slider so they can control how much of the
          small changes in the data are captured in the composition. Given this
          number, we sample the data at regular intervals to get that total
          number of notes. For the visualization chart, we sampled the data at
          regular intervals to produce 500 data points so there's enough change
          to see, but few enough data points that the render doesn't take
          forever.
        </Typography>
        <Typography variant="h5" component="h2" style={{ color: COLORS.blue }}>
          Note Generation
        </Typography>
        <Typography paragraph>
          Note Generation involved 3 main steps: <br />
          1. Getting the Scale Notes (for major and minor key) for the key and
          range of octaves selected <br />
          2. Normalizing the stock data to the min and max of the pool of notes{" "}
          <br /> 3. Finding the closest note from our pool of notes to the
          normalized data point. <br />
          <br />
          For our first MVP (before the in class presentation), we constrained
          the range of notes to be from 2 octaves and did not specify a key.
          Later on, we added user input for the key, range of octaves, and type
          of key so the user can customize their composition to suit their
          tastes.
        </Typography>
        <Typography variant="h6" component="h2" style={{ color: COLORS.green }}>
          Getting the Scale Notes
        </Typography>
        <Typography paragraph>
          We have 2 dictionaries stored locally that are used in converting data
          points to notes: every note from C0 to B8's note name and
          corresponding frequency (440Hz A4) and all major and minor scales and
          their corresponding note names. Using these 2 dictionaries and the
          user input of the key, and range of octaves we were able to get all
          notes (and their frequencies) for the major and minor scales for the
          key and range.
        </Typography>
        <Typography variant="h6" component="h2" style={{ color: COLORS.green }}>
          Normalizing the Stock Data
        </Typography>
        <Typography paragraph>
          We first normalize the stock data from 0-1, then scale it to a new
          range (based on the min and max of the major and minor scales),
          resulting in 2 new arrays of normalized stock data, one for the major
          key and one for the minor key. This was necessary so that we can get a
          full range of sounds based on what the user wanted - furthermore,
          stock data values are usually pretty close and if we only used the raw
          value, may have resulted very low frequencies (50-100) that are almost
          inaudible and have very little perceived difference to the untrained
          ear. This normalization and step 1 allows the user to choose the level
          of granularity (larger or smaller range) in which they want to hear
          the differences between data points (and in what key too!).
        </Typography>
        <Typography variant="h6" component="h2" style={{ color: COLORS.green }}>
          Finding the Closest Note
        </Typography>
        <Typography paragraph>
          To find the closest note, we compare with all notes in our pool of
          notes and see which note has a frequency closest to our normalized
          note. If the key type selected is major or minor, we just use the
          notes from the major key scales or minor key scales only. If the key
          type is both, we will choose the major note if the previous data point
          is less (increasing!) and minor otherwise. We decided to include the
          both option as a more intuitive way to hear if the data is increasing
          or decreasing, since we automatically associate major sounds with more
          positive emotions and minor sounds with more negative ones.
        </Typography>
        <Typography variant="h5" component="h2" style={{ color: COLORS.blue }}>
          UI/UX
        </Typography>
        <Typography paragraph>
          Since we were working with stock data, we thought it'd be fun to make
          our web-app look kind of like a Bloomberg terminal! So we took their
          color scheme (red, green, orange, dark background), and chart styling
          (blue gradient). We used the Material UI components library (for the
          buttons, date selector, sliders, etc) and TailwindCSS for styling.
        </Typography>
        {/* Content for Limitations & Future Work */}
        <Typography
          variant="h4"
          component="h1"
          style={{ color: COLORS.orange }}
        >
          Limitations & Future Work
        </Typography>
        <Typography paragraph>
          Despite our best efforts to preprocess and filter data, changing the
          date range still takes a couple seconds to load the new data. One
          possible workaround is to move our data to a database, and have a
          backend to query that could do the processing faster than what we're
          currently doing client-side. Another thing we could add is a “Loading”
          UX so that it's not as awkward when things just get stuck.
        </Typography>
        <Typography paragraph>
          There's a lot more interesting things that we didn't get to with
          regards to the sound. For example, we only change our frequency,
          volume, and harmonics, but other forms of modulation, and even
          granular synthesis, could be used to make the sound more complex.
          Additionally, we only have one melody line, but having multiple that
          interact together (perhaps from multiple data streams) could be
          interesting. Lastly, we only played with the note quality, but not
          with rhythm!
        </Typography>
        {/* ... */}
      </div>
    </div>
  );
};

export default Blog;
