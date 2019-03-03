import React, { Component } from 'react';
import Chat from './Chat.js';
import { NavLink } from "react-router-dom";

const messages = [
  { role: 'page', text: 'Hi!', next: true },
  { options: [
    { role: 'user', text: 'Hiho!', branch: 'red', next: true },
    { role: 'user', text: 'Hellohello', branch: 'blue', next: true }
  ]},
  { role: 'page', text: 'Nunc pharetra accumsan facilisis.', branch: 'red', next: true },
  { role: 'page', text: 'This is A2', branch: 'red', next: true },
  { role: 'user', input: 'input', branch: 'red' },
  { role: 'page', text: 'Nunc pharetra accumsan facilisis.', branch: 'blue', next: true },
  { role: 'page', text: 'This is B2', branch: 'blue', next: true },
  { role: 'user', input: 'input', branch: 'blue', delegate: async function(message) {
    return Object.assign({}, message, {
      branch: 'red',
      text: `"${message.text}"`
    });
  }}
];

const styles = {
  h1: {
    fontSize: '2.747em',
    // columnSpan: 'all'
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
      margin: '0',
      maxWidth: '100em',
      padding: '1em',
      columnCount: '3',
      columnWidth: '18em',
      columnGap: '5em',
      columnFill: 'auto',
      columnRule: '1px dotted #ddd',
      fontSize: '100%',
      lineHeight: '1.5',
      fontFamily: '\'Merriweather\', Georgia, \'Times New Roman\', Times, serif', //'Meta Serif Offc W01 Medium', //
      color: '#333'
    }
};

class Text extends Component {
  constructor(props) {
    super(props);
    const storageId = `texttile:${props.chatId}`;
    const state = window.localStorage.getItem(storageId);
    if (state) this.state = JSON.parse(state);

    if (!state) {
      this.state = {
        readArticleOne: false
      };

      window.localStorage.setItem(storageId, JSON.stringify(this.state));
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const storageId = `texttile:${this.props.chatId}`;
    window.localStorage.setItem(storageId, JSON.stringify(nextState));
  }

  componentWillUnmount() {
    const storageId = `texttile:${this.props.chatId}`;
    window.localStorage.setItem(storageId, JSON.stringify(this.state));
  }

  markAsRead = (event) => this.setState({ readArticleOne: true });

  render() {
    return (<div style={styles.section}>
      <h1 style={styles.h1}>11 Borderline Genius Tips For Making A Gingerbread House</h1>
      <h2 style={styles.h2}>PREPARATION</h2>
      <p>Preheat the oven to 350ºF (180ºC). Line 2 baking sheets with parchment paper.</p>
      <p>In a large bowl, sift together the flour, baking soda, ginger, nutmeg, cinnamon, and salt. Set aside.</p>
      <p>Grease the bottom and sides of a heavy-bottomed pot (such as a Dutch oven) with nonstick spray. This will ensure the dough doesn’t stick to the pot as you turn it out.</p>
      <p>Melt the shortening in the greased pot over medium heat. Add the molasses and sugar, bring to a boil, then turn off the heat.</p>
      <p>Gradually stir in 4 cups of the flour mixture, 1 cup at a time, making sure to fully incorporate each addition before adding more. You’ll have some of the flour mixture left over.</p>
      <ul><li>point, the first</li><li>idea, the second</li><li>thought, the third</li></ul>
      <hr />
      <p>Dust a work surface with some of the remaining flour mixture. Carefully turn the dough out onto the floured surface and work in the flour mixture. (You don’t want the dough to be too crumbly. You may have some flour mixture left over, which can be used for rolling out the dough.) Before you go any further <a href="#article-one" onClick={this.markAsRead}>READ THIS</a>.</p>
      { this.state.readArticleOne ? <Chat messages={messages} width={styles.section.columnWidth} chatId="1" /> : '' }
      <p>Once the flour is incorporated, shape the dough into a 12-inch log and cut into 3 portions, 1 piece slightly larger than the others for the roof.</p>
      <p>Set aside the smaller pieces of dough in the pot (it still should be warm, but not hot), cover with plastic wrap, and put the lid on. You’ll want to work with the dough while it’s warm as it tends to harden at room temperature. If it hardens, simply microwave for about 30 seconds.</p>
      <p>On the floured surface, roll out the larger piece of dough to a rectangle about ½-inch thick. Using a house template, cut the 2 pieces of the roof and set on a prepared baking sheet, spacing about 1 inch apart as the dough will expand while baking.</p>
      <p>Roll out the rest of the dough and cut out the front, back, and sides of the house using the templates. Place on a baking sheet.</p>
      <p>Wrap the leftover dough in plastic wrap and store at room temperature for up to 1 day. Microwave to soften and roll out to make decorations for the house or another gingerbread creation.</p>
      <p>Bake the gingerbread house pieces for 12-15 minutes, until they have hardened and baked through. Let cool completely.</p>
      <p>Make the royal icing: In a large bowl, beat the egg whites and cream of tartar with an electric hand mixer until frothy. Gradually add the powdered sugar, 1 cup at a time, until the icing is smooth and thick. NOTE: The icing is used for gluing the house together. It’s very thick. To use the icing for decorating, add about 1 teaspoon of water at a time to thin the icing to your desired consistency.</p>
      <p>Assemble the gingerbread house with the royal icing. TIP: Put the roof pieces side by side with the underside up (and the eventual exposed part of the roof down). “Glue” a cut piece of a paper shopping bag across these two pieces with royal icing. Place two small glass bowls on either side of this upside-down roof to prop the pieces up into a “V” shape. Let dry completely. When assembling, this will help ensure that your roof doesn’t slip down the sides of the house.</p>
      <p>Decorate the house with more royal icing and your desired decorations.</p>
      <NavLink to="/section-2/">Go to next section.</NavLink>
    </div>);
  }
}

export default Text;
