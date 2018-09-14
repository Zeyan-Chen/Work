import React from 'react';
import BtConx from './index.js';
import { storiesOf } from '@storybook/react';
// import LbConl from "../../lb_conl/components/Module";

/**
 * ## [Storybook Tutorial](https://www.learnstorybook.com/)
 */
storiesOf('組合模組（combine group）', module).add('bt_conx', () => (
    <div className="container">
        <div>
            <BtConx href="https://www.youtube.com/">更多國外團體</BtConx>
        </div>
    </div>
));
