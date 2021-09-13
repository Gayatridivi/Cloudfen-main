package com.cloudfen.home.service;

import com.cloudfen.home.domain.UserAccount;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link UserAccount}.
 */
public interface UserAccountService {
    /**
     * Save a userAccount.
     *
     * @param userAccount the entity to save.
     * @return the persisted entity.
     */
    UserAccount save(UserAccount userAccount);

    /**
     * Partially updates a userAccount.
     *
     * @param userAccount the entity to update partially.
     * @return the persisted entity.
     */
    Optional<UserAccount> partialUpdate(UserAccount userAccount);

    /**
     * Get all the userAccounts.
     *
     * @return the list of entities.
     */
    List<UserAccount> findAll();

    /**
     * Get the "id" userAccount.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<UserAccount> findOne(Long id);

    /**
     * Delete the "id" userAccount.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
