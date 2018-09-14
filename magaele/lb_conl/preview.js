import React from 'react';
import LbConl from './index.js';
import { storiesOf } from '@storybook/react';

/**
 * ## [Storybook Tutorial](https://www.learnstorybook.com/)
 */
storiesOf('組合模組（combine group）', module).add('lb_conl', () => (
    <div>
        <h3>Style:lb_conl_1</h3>
        <LbConl name="lb_conl_1">夏季旅展</LbConl>
        <h3>Style:lb_conl_2</h3>
        <LbConl name="lb_conl_2">NEW</LbConl>
    </div>
));
