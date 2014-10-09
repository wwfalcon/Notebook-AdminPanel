    $(function() {
        // init the tree
        $('#tree').aciTree({
            ajax: {
                url: 'js/data/checkbox.json'
            },
            // our custom filter/search
            filterHook: function(item, search, regexp) {
                if (search.length) {
                    // try to get the parent
                    var parent = this.parent(item);
                    if (parent.length) {
                        // get parent label
                        var label = this.getLabel(parent);
                        if (regexp.test(String(label))) {
                            // all direct childrens match
                            return true;
                        }
                    }
                    // match the item
                    return regexp.test(String(this.getLabel(item)));
                } else {
                    // empty search, all matches
                    return true;
                }
            }
        });
        var api = $('#tree').aciTree('api');
        $('#search').val('')
        var last = '';
        $('#search').keyup(function() {
            if ($(this).val() == last) {
                return;
            }
            last = $(this).val();
            api.filter(null, {
                search: $(this).val(),
                success: function(item, options) {
                    if (!options.first) {
                        alert('No results found!');
                    }
                }
            });
        });
        $('#prev').click(function() {
            api.prevMatch(api.selected(), $('#search').val(), function(item) {
                if (item) {
                    // open parents & bring into view
                    this.openPath(item, {
                        success: function(item) {
                            this.setVisible(item);
                        }
                    });
                    // select the item
                    this.select(item);
                } else {
                    alert('No more results found!');
                }
            });
        });
        $('#next').click(function() {
            api.nextMatch(api.selected(), $('#search').val(), function(item) {
                if (item) {
                    // open parents & bring into view
                    this.openPath(item, {
                        success: function(item) {
                            this.setVisible(item);
                        }
                    });
                    // select the item
                    this.select(item);
                } else {
                    alert('No more results found!');
                }
            });
        });
    });