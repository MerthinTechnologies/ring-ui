import React, {cloneElement, Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Sidebar from './sidebar';
import styles from './content-layout.css';

/**
 * @name Content Layout
 * @category Components
 * @framework React
 * @constructor
 * @description A component for simple content layout.
 * @example-file ./content-layout.examples.html
 */

export default class ContentLayout extends Component {
  static defaultProps = {
    responsive: true
  };

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    responsive: PropTypes.bool
  };

  state = {};

  saveContentNode = contentNode => {
    this.setState({contentNode});
  };

  render() {
    const {children, className, contentClassName, responsive, ...restProps} = this.props;

    const classes = classNames(styles.contentLayout, className, {
      [styles.contentLayoutResponsive]: responsive
    });

    const contentClasses = classNames(styles.contentLayoutContent, contentClassName);

    const childrenArray = React.Children.toArray(children);
    const sidebarChild = childrenArray.filter(child => child && child.type === Sidebar)[0];

    const sidebar = sidebarChild && cloneElement(sidebarChild, {
      contentNode: this.state.contentNode
    });
    const contentChildren = childrenArray.filter(child => child !== sidebarChild);

    return (
      <div
        {...restProps}
        className={classes}
      >
        {sidebar}
        <div
          className={contentClasses}
          ref={this.saveContentNode}
        >
          {contentChildren}
        </div>
      </div>
    );
  }
}

export {default as Sidebar} from './sidebar';
