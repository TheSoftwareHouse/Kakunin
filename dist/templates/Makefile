include .env

install:
	rm -rf ./node_modules
	npm install

tests:
	(npm run kakunin) && make on-test-success || make on-test-failure

on-test-success:
	echo 'success and happiness'

on-test-failure:
	echo'Automated tests failed. Testing command "npm run kakunin" exited with nonzero status'

