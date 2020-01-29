// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Fs = require("fs");
var $$Array = require("bs-platform/lib/js/array.js");

((require('isomorphic-fetch')));

var Result = { };

var BlockPage = { };

function parseBlockPages(pageNumber, creatorsList) {
  return fetch("http://blocks.o1test.net/api/v1/blocks/?page=" + pageNumber.toString()).then((function (prim) {
                  return prim.json();
                })).then((function (json) {
                var match = json.detail;
                if (match !== undefined) {
                  console.log("End of pages reached");
                  return Promise.resolve(creatorsList);
                } else {
                  var creators = $$Array.map((function (result) {
                          return result.creator;
                        }), json.results);
                  return parseBlockPages(pageNumber + 1 | 0, creatorsList.concat(creators));
                }
              }));
}

var Account = { };

var supposedBlockProducers = { };

JSON.parse(Fs.readFileSync("src/annotated_ledger.json", "utf8")).filter((function (account) {
          return account.balance === 1000;
        })).forEach((function (account) {
        supposedBlockProducers[account.pk] = account.nickname;
        return /* () */0;
      }));

var supposedBlockProducersList = supposedBlockProducers;

exports.Result = Result;
exports.BlockPage = BlockPage;
exports.parseBlockPages = parseBlockPages;
exports.Account = Account;
exports.supposedBlockProducersList = supposedBlockProducersList;
/*  Not a pure module */