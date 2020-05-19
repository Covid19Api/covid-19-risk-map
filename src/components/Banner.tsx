import * as React from 'react'

export const Banner = () => {
    return (
        <div style={{height: '8vh', backgroundColor: 'orange', position: 'absolute', bottom: '0px', width: '100%', display: 'table'}}>
            <div style={{verticalAlign: 'middle', display: 'table-cell'}}>
                <div>
                    This is an alpha release. See progress: https://github.com/covid19api
                </div>
            </div>
        </div>
    )
  }
