import React from 'react';
import { PrismCode } from 'react-prism';
import { dedent } from 'dentist';

const DocumentProptypes = (props) => {
  const {
    name,
    proptypes
  } = props.component;
  return (
    <div className="docs-component-props">
      <h3>{name} - PropTypes</h3>
      <pre>
        <PrismCode className="language-jsx">
          {`${name}.propTypes = ${dedent(proptypes)}`}
        </PrismCode>
      </pre>
    </div>
  );
};

const DocumentExamples = (props) => {
  const {
    name,
    demo,
    source
  } = props.component;
  return (
    <div className="docs-component-props">
      <h3>{name}</h3>
      { demo && (
        <div className="docs-example">
          {demo}
        </div>
      )}
      { source && (
        <pre>
          <PrismCode className="language-jsx">
            {dedent(source)}
          </PrismCode>
        </pre>
      )}
    </div>
  );
};

const DocumentComponent = (props) => {
  const {
    name,
    children,
    components = [],
    examples = []
   } = props;
  return (
    <div className="docs-component-section">
      <h1>{name}</h1>
      {children}
      { components.map((component,i) => <DocumentProptypes key={i} component={component} />)}
      { examples.map((example,i) => <DocumentExamples key={i} component={example} />)}
    </div>
  );
};

export default DocumentComponent;
