package main

import (
	"testing"

	. "github.com/orbs-network/orbs-contract-sdk/go/testing/unit"
	"github.com/stretchr/testify/require"
)

const KEY = "01234"

func TestVerifyNonExistingRecord(t *testing.T) {
	InServiceScope(nil, nil, func(m Mockery) {
		timestamp, _ := verify(KEY)
		require.EqualValues(t, timestamp, 0)
	})
}

func TestRegisteringRecord(t *testing.T) {
	InServiceScope(nil, nil, func(m Mockery) {
		timestamp, _ := register(KEY)
		require.NotEqual(t, timestamp, 0)
	})
}

func TestPanicIfRecordExists(t *testing.T) {
	InServiceScope(nil, nil, func(m Mockery) {
		register(KEY)
		require.Panics(t, func() {
			register(KEY)
		})
	})
}

func TestVerifyExistingRecord(t *testing.T) {
	InServiceScope(nil, nil, func(m Mockery) {
		timestamp1, signer1 := register(KEY)
		timestamp2, signer2 := verify(KEY)
		require.EqualValues(t, timestamp1, timestamp2)
		require.EqualValues(t, signer1, signer2)
	})
}
