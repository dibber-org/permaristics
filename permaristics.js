// Site
$(function() {
    $('#to-norps').click(function(e) {
        e.preventDefault();
        $('.choices, .result').each(function() {
            $(this).hide();
        });
        $('#needs-choices').empty();
        addChoice('needs');
        $('#products-choices').empty();
        addChoice('products');

        $('#norps').show();
        $(document).scrollTop($('#norps').offset().top - 15);
    });

    $('#to-elements').click(function(e) {
        e.preventDefault();
        $('.choices, .result').each(function() {
            $(this).hide();
        });
        $('#elements-choices').empty();
        addChoice('elements');

        $('#elements').show();
        $(document).scrollTop($('#elements').offset().top - 15);
    });

    var addChoice = function(type) {
        var $choice = createChoice(type);
        $choice.appendTo('#' + type + '-choices');
    };

    var createChoice = function(type) {
        var data = permaristics().sortObject(type == 'elements' ? permaristics().elements().all() : permaristics().connections());
        var lastOfType = parseInt($('.' + type + '-choice:last').length ? $('.' + type + '-choice:last').attr('data-cpt') : 0);
        var $select = $('<select class="' + type + '-choice" data-cpt="' + (lastOfType + 1) + '">');
        var options = '<option value="">--</option>';
        for (dataKey in data) {
            options += '<option value="' + dataKey + '">' + data[dataKey].label + '</option>'
        }
        $select.change(function() {
            var lastOfType = $('.' + type + '-choice:last').length ? $('.' + type + '-choice:last').attr('data-cpt') : 0;
            if (lastOfType == $(this).attr('data-cpt')) {
                addChoice(type);
            }
        });

        return $select.html(options);
    }

    $('.find-combinations').click(function() {
        var restrictions = {};
        var types = $(this).parents('#norps').length == 1 ? ['needs', 'products'] : ['elements'];

        $.each(types, function(idx, type) {
            $('#' + type + '-choices .' + type + '-choice option:selected').each(function() {
                var $choice = $(this);
                if ($choice.val()) {
                    var neededType = type == 'elements' ? 'name' : type;
                    if (typeof restrictions[neededType] === 'undefined') {
                        restrictions[neededType] = [];
                    }
                    restrictions[neededType].push($choice.val());
                }
            });
        });

        displayGraph(restrictions);
    });

    var displayGraph = function(restrictions) {
        $('#graph').empty();
        permaristics().graph('#graph', restrictions);

        $('#result').show();
        $(document).scrollTop($('#result').offset().top - 15);
    };
});

// App
permaristics = function() {
    return {
        'elements': function(name) {
            var data = {
                'chicken': {
                    'name': 'chicken',
                    'label': 'Chicken',
                    'needs': [
                        'insect', 'air', 'water', 'shelter', 'protection', 'community', 'grit', 'dust', 'disease-control'
                    ],
                    'products': [
                        'egg', 'meat', 'manure', 'feather', 'scraping', 'co2', 'heat', 'deworming'
                    ],
                    'characteristics': {
                        'breed': '...',
                        'color': '...',
                        'layability': '...',
                        'meat': '...', // quality
                        'climat': '...' // tolerance
                    },
                    'behaviors': [
                        'fly', 'noise', 'fight'
                    ],
                    'type': 'poultry'
                },
                'pond': {
                    'name': 'pond',
                    'label': 'Pond',
                    'needs': [
                        'space'
                    ],
                    'products': [
                        'water', 'micro-climate', 'insect'
                    ],
                    'characteristics': {
                        'size': '...',
                        'deepness': '...'
                    },
                    'behaviors': [
                        'fills-up-with-rain'
                    ]
                },
                'oak': {
                    'name': 'oak',
                    'label': 'Oak',
                    'needs': [
                        'air', 'soil', 'water', 'sunlight', 'space'
                    ],
                    'products': [
                        'oxygen', 'wood', 'shade', 'windbreak', 'leaf', 'habitat', 'acorn', 'moisture'
                    ],
                    'characteristics': {
                        'specie': '...',
                        'bark': '...',
                        'longevity': '...',
                        'leaf-shape': '...',
                        'size': '...',
                        'root-pattern': '...'
                    },
                    'behaviors': [
                        'growth-towards-light', 'spreading-to-fill-space', 'slow-growth', 'deciduous'
                    ],
                    'type': 'tree'
                }
            };

            var toReturn = {
                'get': function(name) {
                    if (data[name]) {
                        return data[name];
                    }
                },
                'all': function() { return data; },
                'filterBy': function(restrictions, elements) {
                    var filtered = {};
                    elements = typeof elements === 'undefined' ? data : elements;
                    for (var name in elements) {
                        if (!elements.hasOwnProperty(name)) {
                            continue;
                        }
                        var add = false;
                        var one = toReturn.get(name);

                        ['needs', 'products', 'behaviors'].forEach(function(type) {
                            if (restrictions.hasOwnProperty(type)) {
                                add = toReturn.oneHas(one, type, restrictions[type]) || add;
                            }
                        });
                        if (restrictions.hasOwnProperty('name')) {
                            add = restrictions.name.indexOf(name) >= 0 || add;
                        }

                        if (add == true) {
                            filtered[name] = one;
                        }
                    }

                    return filtered;
                },
                'oneHas': function(name, type, values) {
                    if (['needs', 'products', 'behaviors'].indexOf(type) < 0) {
                        return false;
                    }
                    var one = (typeof name === 'string' || name instanceof String) ? toReturn.get(name) : name;
                    var has = false;
                    values.forEach(function(value) {
                        has = one[type].indexOf(value) >= 0 || has;
                    });

                    return has;
                },
                'oneHasNeeds': function(name, needs) {
                    return toReturn.oneHas(name, 'needs', needs);
                },
                'oneHasProducts': function(name, products) {
                    return toReturn.oneHas(name, 'products', products);
                },
                'oneHasBehaviors': function(name, behaviors) {
                    return toReturn.oneHas(name, 'behaviors', behaviors);
                },
                'propertiesFromElements': function(elements, restrictTo) {
                    var restrictions = [];
                    restrictTo = typeof restrictTo === 'undefined' ? ['needs', 'products', 'behaviors'] : restrictTo;
                    for (var restriction in restrictTo) {
                        restrictions[restrictTo[restriction]] = [];
                    }

                    for (var name in elements) {
                        for  (var restriction in restrictions) {
                            restrictions[restriction] = permaristics().merge(restrictions[restriction], elements[name][restriction], true);
                        }
                    }

                    return restrictions;
                },
                'combine': function(elements) {
                    var links = [];
                    var products = {};

                    for (var name in elements) {
                        for (var productKey in elements[name].products) {
                            if (typeof products[elements[name].products[productKey]] === 'undefined') {
                                products[elements[name].products[productKey]] = [];
                            }
                            products[elements[name].products[productKey]].push(name);
                        }
                    }

                    for (var name in elements) {
                        for (var needKey in elements[name].needs) {
                            var need = elements[name].needs[needKey];
                            if (typeof products[need] !== 'undefined') {
                                for (producerName in products[need]) {
                                    var link = {
                                        'source': products[need][producerName],
                                        'target': name,
                                        'type':   need
                                    };
                                    links.push(link);
                                }
                            }
                        }
                    }

                    return links;
                }
            };

            if (name) {
                return toReturn.get(name);
            }

            return toReturn;
        },
        'connections': function(name) {
            var data = {
                'insect': {
                    'name': 'insect',
                    'label': 'Insect'
                },
                'air': {
                    'name': 'air',
                    'label': 'Air'
                },
                'water': {
                    'name': 'water',
                    'label': 'Water'
                },
                'shelter': {
                    'name': 'shelter',
                    'label': 'Shelter'
                },
                'protection': {
                    'name': 'protection',
                    'label': 'Protection'
                },
                'community': {
                    'name': 'community',
                    'label': 'Community'
                },
                'grit': {
                    'name': 'grit',
                    'label': 'Grit'
                },
                'dust': {
                    'name': 'dust',
                    'label': 'Dust'
                },
                'disease-control': {
                    'name': 'disease-control',
                    'label': 'Disease control'
                },
                'egg': {
                    'name': 'egg',
                    'label': 'Egg'
                },
                'meat': {
                    'name': 'meat',
                    'label': 'Meat'
                },
                'meat': {
                    'name': 'meat',
                    'label': 'Meat'
                },
                'manure': {
                    'name': 'manure',
                    'label': 'Manure'
                },
                'feather': {
                    'name': 'feather',
                    'label': 'Feather'
                },
                'scraping': {
                    'name': 'scraping',
                    'label': 'Scraping'
                },
                'co2': {
                    'name': 'co2',
                    'label': 'CO2'
                },
                'heat': {
                    'name': 'heat',
                    'label': 'Heat'
                },
                'deworming': {
                    'name': 'deworming',
                    'label': 'Deworming'
                },
                'soil': {
                    'name': 'soil',
                    'label': 'Soil'
                },
                'sunlight': {
                    'name': 'sunlight',
                    'label': 'Sunlight'
                },
                'space': {
                    'name': 'space',
                    'label': 'Space'
                },
                'micro-climat': {
                    'name': 'micro-climat',
                    'label': 'Micro climat'
                },
                'oxygen': {
                    'name': 'oxygen',
                    'label': 'Oxygen'
                },
                'wood': {
                    'name': 'wood',
                    'label': 'Wood'
                },
                'shade': {
                    'name': 'shade',
                    'label': 'Shade'
                },
                'windbreak': {
                    'name': 'windbreak',
                    'label': 'Windbreak'
                },
                'habitat': {
                    'name': 'habitat',
                    'label': 'Habitat'
                },
                'acorn': {
                    'name': 'acorn',
                    'label': 'Acorn'
                },
                'moisture': {
                    'name': 'moisture',
                    'label': 'Moisture'
                },
                'leaf': {
                    'name': 'leaf',
                    'label': 'Leaf'
                }
            };

            function get(name) {
                if (data[name]) {
                    return data[name];
                }
            };

            if (name) {
                return get(name);
            }

            return data;
        },
        'behaviors': function(name) {
            var data = {
                'fly': {
                    'name': 'fly',
                    'label': 'Fly'
                    // ...
                },
                'noise': {
                    'name': 'noise',
                    'label': 'Noise',
                    // ...
                },
                'fight': {
                    'name': 'fight',
                    'label': 'Fight',
                    // ...
                },
                'growth-towards-light': {
                    'name': 'growth-towards-light',
                    'label': 'Groth towards light',
                    // ...
                },
                'spreading-to-fill-space': {
                    'name': 'spreading-to-fill-space',
                    'label': 'Spreading to fill space',
                    // ...
                },
                'slow-growth': {
                    'name': 'slow-growth',
                    'label': 'Slow growth',
                    // ...
                },
                'deciduous': {
                    'name': 'deciduous',
                    'label': 'Deciduous',
                    // ...
                }
            };

            function get(name) {
                if (data[name]) {
                    return data[name];
                }
            };

            if (name) {
                return get(name);
            }

            return data;
        },
        'types': function(name) {
            var data = {
                'poultry': {
                    'name': 'poultry',
                    'label': 'Poultry',
                    // ...

                },
                'tree': {
                    'name': 'tree',
                    'label': 'Tree',
                    // ...
                }
            };

            function get(name) {
                if (data[name]) {
                    return data[name];
                }
            };

            if (name) {
                return get(name);
            }

            return data;
        },
        'merge': function (arr, src, unique) {
            var dest = [];
            unique = typeof unique === 'undefined' ? false : unique;

            for (var key in arr) {
                if (unique == false || (unique == true && dest.indexOf(arr[key]) == -1)) {
                    dest.push(arr[key]);
                }
            }
            for (var key in src) {
                if (unique == false || (unique == true && dest.indexOf(src[key]) == -1)) {
                    dest.push(src[key]);
                }
            }

            return dest;
        },
        'sortObject': function sortObject(o) {
            var sorted = {},
            key, a = [];

            for (key in o) {
                if (o.hasOwnProperty(key)) {
                    a.push(key);
                }
            }

            a.sort();

            for (key = 0; key < a.length; key++) {
                sorted[a[key]] = o[a[key]];
            }
            return sorted;
        },
        'graph': function (selector, restrictions) {
            var elements = {};
            if (restrictions.hasOwnProperty('name')) {
                elements = $.extend(elements, permaristics().elements().filterBy({'name': restrictions.name}));
                for (var name in elements) {
                    elements[name].needed = true;
                }
                delete restrictions.name;
            }
            if (restrictions.hasOwnProperty('needs') || restrictions.hasOwnProperty('products') || restrictions.hasOwnProperty('behaviors')) {
                elements = $.extend(elements, permaristics().elements().filterBy(restrictions));
            } else if (Object.keys(elements).length) {
                var invertedRestrictions = permaristics().elements().propertiesFromElements(elements, ['needs', 'products']);
                var restrictionsFromGivenElements = {
                    'needs':    invertedRestrictions.products,
                    'products': invertedRestrictions.needs,
                };
                elements = $.extend(elements, permaristics().elements().filterBy(restrictionsFromGivenElements));
            }

            var links = permaristics().elements().combine(elements);

            //sort links by source, then target
            links.sort(function(a,b) {
                if (a.source > b.source) {return 1;}
                else if (a.source < b.source) {return -1;}
                else {
                    if (a.target > b.target) {return 1;}
                    if (a.target < b.target) {return -1;}
                    else {return 0;}
                }
            });

            var nodes = {};

            // Compute the distinct nodes from the links.
            links.forEach(function(link) {
                link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
                link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
            });

            var w = 600,
                h = 600;

            var force = d3.layout.force()
                .nodes(d3.values(nodes))
                .links(links)
                .size([w, h])
                .linkDistance(120)
                .charge(-700)
                .on("tick", tick)
                .start();

            var svg = d3.select(selector).append("svg:svg")
                .attr("width", w)
                .attr("height", h);

            // Per-type markers, as they don't inherit styles.
            svg.append("svg:defs").selectAll("marker")
                .data(["insect", "water"])
              .enter().append("svg:marker")
                .attr("id", String)
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 8)
                .attr("refY", 0)
                .attr("markerWidth", 6)
                .attr("markerHeight", 6)
                .attr("orient", "auto")
              .append("svg:path")
                .attr("d", "M0,-5L10,0L0,5");

            var path = svg.append("svg:g").selectAll("path")
                .data(force.links())
              .enter().append("svg:path")
                .attr("class", function(d) { return "link " + d.type; })
                .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });

            var circle = svg.append("svg:g").selectAll("circle")
                .data(force.nodes())
              .enter().append("svg:circle")
                .attr("r", 40)
                .call(force.drag);

            var text = svg.append("svg:g").selectAll("g")
                .data(force.nodes())
              .enter().append("svg:g");

            // A copy of the text with a thick white stroke for legibility.
            text.append("svg:text")
                .attr("x", 0)
                .attr("y", "0.1em")
                .attr('text-anchor', 'middle')
                .attr("class", "shadow")
                .text(function(d) { return d.name; });

            text.append("svg:text")
                .attr("x", 0)
                .attr("y", "0.1em")
                .attr('text-anchor', 'middle')
                .text(function(d) { return d.name; });

            // Use elliptical arc path segments to doubly-encode directionality.
            function tick() {
                path.attr("d", function(d) {

                    var dx = d.target.x - d.source.x,
                        dy = d.target.y - d.source.y,
                        dr = 50;

                    // Length of path from center of source node to center of target node
                    var length = Math.sqrt((dx * dx) + (dy * dy));

                    // x and y distances from center to outside edge of target node
                    var ox = (dx * 40) / length;
                    var oy = (dy * 40) / length;

                    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + (d.target.x - ox) + "," + (d.target.y + oy);
                });

                circle.attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });

                text.attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });
            }
        }
    };
};
