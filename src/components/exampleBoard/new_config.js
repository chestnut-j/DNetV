export const new_configSet = [
    {
        // time: 'position',
        // comparison: 'color'
        renderType: 'position'
    },
    {
        time: ['position'],
        comparison: true,
        renderType: 'position'
    },
    {
        time: ['position'],
        renderType: 'position'
    },
    {
        time: ['position'],
        comparison: true,
        renderType: 'position'
    },
    {
        time: ['animation'],
        comparison: true,
        renderType: 'animation'
    },
    {
        time: ['animation', 'position'],
        comparison: true,
        renderType: 'animation'
    },
    // // {
    // //     time: 'color'
    // // },
    {
        time: ['link', 'position'],
        comparison: true,
        layout: 'vertical'
    }
]

// 挑选配置的json：
const config = {
    // time的数组可以长度为0，此项也可以不存在。上述两种情况，则time: ['position']
    time: ['position', 'animation', 'link', 'color'],  
    // 默认是false。 为true则会调用3种不同状态的节点和链接。
    comparison: true,
    // 默认是offLine
    layout: 'vertical',
    // 覆盖配置的json， 和基本详细配置的数据格式是一致的。
    // 作用是覆盖详细的配置
    coverConfig: {


    }
}

// 这里面应该是

export const defaultConfigs = {
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
    basic: {
        width: 1010,
        height: 200,
        eachWidth: 200,
        eachHeight: 200,
        margin: 10,
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



