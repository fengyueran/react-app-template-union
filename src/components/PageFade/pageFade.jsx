import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import "./pageFade.css";

const PageFade = ({ children, locationKey }) => (
  <TransitionGroup>
    <CSSTransition
      key={locationKey}
      classNames="fadeTranslate"
      timeout={1000}
    >
      <section className="fix-container">
        {children}
      </section>
    </CSSTransition>
  </TransitionGroup>
);

PageFade.propTypes = {
  locationKey: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default PageFade;
