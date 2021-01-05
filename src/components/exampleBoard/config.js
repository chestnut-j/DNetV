export const configSet = [
    {},
    {
        layout: 'vertical',
        time: ['timeLine', 'markLine']
    },
    {
        time: 'timeLine'
    },
    {
        time: ['timeLine', 'markLine']
    },
    {
        comparison: 'color'
    },

    {
        time: 'timeLine',
        comparison: 'color'
    },
    {
        time: {
            timeLine: {
                element: 'node'
            }
        },
        comparison: 'color'
    },
    {
        time: {
            timeLine: {
                element: 'link'
            }
        },
        comparison: 'color'
    },

    {
        time: 'animation'
    },
    {
        time: 'animation',
        comparison: 'color'
    },
    {
        time: ['animation', 'timeLine'],
        comparison: 'color'
    },
    {
        time: [
            'animation',
            {
                timeLine: {
                    element: 'node'
                }
            }
        ],
        comparison: 'color'
    },
    {
        time: [
            'animation',
            {
                timeLine: {
                    element: 'link'
                }
            }
        ],
        comparison: 'color'
    },
    {
        layout: 'vertical',
        time: {
            timeLine: {
                element: 'link'
            }
        }
    },
    {
        layout: 'vertical',
        time: {
            timeLine: {
                element: 'node'
            }
        }
    },
    {
        layout: 'vertical',
        time: {
            timeLine: {
                element: 'node'
            }
        },
        comparison: 'color'
    },
    {
        time: ['timeLine', 'insert']
    },
    {
        time: [
            'timeLine',
            {
                insert: {
                    position: 'bottom', //目前就实现这一个。。。
                    linkStyle: {
                        shape: 'curve'
                    }
                }
            }
        ]
    },
    {
        time: [
            'timeLine',
            'color',
            {
                insert: {
                    position: 'bottom', //目前就实现这一个。。。
                    linkStyle: {
                        shape: 'curve'
                    }
                }
            }
        ]
    }
]
