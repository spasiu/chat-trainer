import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

const styles = {
  h1: {
    fontSize: '2.747em',
    columnSpan: 'all'
  },
  h2: {
    fontSize: '0.874em'
  },
  h3: {
    fontSize: '1.229em'
  },
  section: {
      height: '100%',
      width: '100%',
      margin: '0px',
      maxWidth: '100em',
      padding: '1em',
      columnCount: '2',
      columnWidth: '18em',
      columnGap: '5em',
      columnFill: 'auto',
      columnRule: '1px dotted #ddd',
      fontSize: '120%',
      lineHeight: '1.5',
      fontFamily: 'Meta Serif Offc W01 Light',
      // backgroundColor: '#441141',
      color: '#333'
    }
};

class Intro extends Component {
  render() {
    return <div style={styles.section}>
      <h1 style={styles.h1}>Smooch Product Support Training Program</h1>
      <h2>What is this?</h2>
      <p>This is a roadmap to gaining the tools and knowledge needed to support the Smooch product. The guiding philosophy of this document and the associated training program is that it's not enough to read documentation, you also need to struggle with the material. Therefor the document contains plenty of exercises and quizzes to get your to grapple with the material.</p>
      <p>Learning outcomes are proportionate to the amount of struggling you do with the material.</p>
      <i>Embrace the suck.</i>
      <h2>How to use this document</h2>
      <p>This document will guide your self-paced learning about the Smooch product and the skills, tools, and workflows that will help you troubleshoot. Combine this material with <b>mentorship</b> and <b>live exercises with a trainer/mentor</b>.</p>
      <p>For each section in this document you should:
        <ul>
          <li>feel free to ask your mentor lots of questions</li>
          <li>read the intro text for each section</li>
          <li>consume the linked external resources</li>
          <li>complete the associated quizzes and practice problems</li>
        </ul>
      </p>
      <NavLink to="/section-1/">Get started!</NavLink>
    </div>;
  }
}

export default Intro;
