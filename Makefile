NODE = node
TEST = ./node_modules/.bin/vows
TESTS ?= test/*-test.js

test:
	@NODE_ENV=test NODE_PATH=lib $(TEST) $(TEST_FLAGS) $(TESTS)

docs: docs/api.html

docs/api.html: lib/french-deck/*.js
	dox \
		--title French-Deck \
		--desc "Basic french deck of playing cards" \
		$(shell find lib/french-deck/* -type f) > $@

docclean:
	rm -f docs/*.{1,html}

.PHONY: test docs docclean
