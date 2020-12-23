export const defaultConfigs = {
    // width: 500,
    // height: 500,

    layout: {
        vertical: {
            yDistance: 40,
            linkStyle: {
                shape: 'curve'
            }
        }
    },
    time: {
        animation: {
            speed: 800
        },
        markingLine: {
            strokeColor: '#FD8F8F',
            strokeWidth: 1,
            strokeDasharray: '5,5'
            // xDistance: 100
            // yDistance: 40
        },
        position: {
            positionFlag: 1,
            eachMargin: 5,
            eachWidth: 200,
            eachHeight: 200
        }
    },
    comparison: {
        color: {
            appearNode: {
                shape: 'circle',
                fillColor: '#FD8F8F',
                strokeColor: '#000000',
                strokeWidth: 1,
                strokeType: 'solid',
                textColor: 'white',
                radius: 6
            },
            stableNode: {
                shape: 'circle',
                fillColor: '#DAD5D5',
                strokeColor: '#000000',
                strokeWidth: 1,
                radius: 6,
                strokeType: 'solid',
                textColor: 'white'
            },
            disappearNode: {
                shape: 'circle',
                fillColor: '#90B5FB',
                strokeColor: '#000000',
                strokeWidth: 1,
                radius: 6,
                strokeType: 'solid',
                textColor: 'white'
            },
            appearLink: {
                strokeColor: '#FD8F8F',
                strokeType: 'solid',
                strokeWidth: 2
            },
            stableLink: {
                strokeColor: '#908F8F',
                strokeType: 'solid',
                strokeWidth: 2
            },
            disappearLink: {
                strokeColor: '#90B5FB',
                strokeType: 'solid',
                strokeWidth: 2
            }
        },
        linkColor: {
            appearLink: {
                strokeColor: '#FD8F8F',
                strokeType: 'solid',
                strokeWidth: 2
            },
            stableLink: {
                strokeColor: '#908F8F',
                strokeType: 'solid',
                strokeWidth: 2
            },
            disappearLink: {
                strokeColor: '#90B5FB',
                strokeType: 'solid',
                strokeWidth: 2
            }
        }
    },
    basic: {
        width: 1010,
        height: 200,
        positionFlag: 0,
        eachWidth: 200,
        eachHeight: 200,
        nodeStyle: {
            shape: 'circle',
            fillColor: '#DAD5D5',
            strokeColor: '#000000',
            strokeWidth: 1,
            radius: 6,
            strokeType: 'solid',
            textColor: 'white'
        },
        linkStyle: {
            shape: 'line',
            strokeColor: '#908F8F',
            strokeType: 'solid',
            strokeWidth: 2
        }
    }
}
